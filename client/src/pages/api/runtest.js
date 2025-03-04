import axios from "axios";
import analysisQueue from "./config/bull";
import { fetchRepoContents } from "./services/GithubActions";
import { test } from "./services/analizer";
import { addFilesToQueue } from "./services/queue";
import { repoSchema } from "./validation/github";
import calculatePerformanceRating from "./services/calculateReport";
import extractFileNameFromURL from "./services/extractFileName";
import redis from "./config/redis";
import parser from "./config/parser";
import calculateELOC from "./modules/calculateELOC";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { link } = repoSchema.parse(req.body);
    const { pythonFiles = [], jsFiles = [] } = await fetchRepoContents(link);

    if (jsFiles.length === 0 && pythonFiles.length === 0) {
      return res
        .status(404)
        .json({ error: "No files found in the repository" });
    }

    await Promise.all([
      addFilesToQueue(jsFiles, "Javascript"),
      addFilesToQueue(pythonFiles, "python"),
    ]);

    const allFiles = [...jsFiles, ...pythonFiles];
    await waitForAnalysisCompletion(allFiles);

    const majorReport = await getAllReports(allFiles);
    return res.status(200).json({ majorReport });
  } catch (error) {
    console.error("Handler Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

analysisQueue.process(async (job) => {
  const { code, fileName, language } = job.data;
  console.log(`Processing file: ${fileName} in ${language}`);

  if (!code) {
    console.warn(`No code received for ${fileName}`);
    return;
  }
  try {
    let message;
    let ELOC = 0;

    if (language === "Javascript") {
      const tree = parser.parse(code);
      ELOC = calculateELOC(tree.rootNode);
      message = await test(code, tree);
    } else if (language === "Python") {
      const response = await axios.post(process.env.PYTHON_API_URL, { code });
      message = response.data;
    }

    const rating = calculatePerformanceRating(message || []);
    const issues = Array.isArray(message) ? message.length : 0;

    const result = { code, message, rating, language, issues, ELOC };
    await redis.set(`report:${fileName}`, JSON.stringify(result));

    console.log(`Stored analysis for ${fileName}`);
  } catch (error) {
    console.error(`Error analyzing code for ${fileName}:`, error);
  }
});

async function waitForAnalysisCompletion(files) {
  const fileNames = files.map((file) => extractFileNameFromURL(file));
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const results = await Promise.all(
        fileNames.map((fileName) => redis.get(`report:${fileName}`))
      );

      if (results.every((result) => result !== null)) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

async function getAllReports(files) {
  const fileNames = files.map((file) => extractFileNameFromURL(file));

  const reports = await Promise.all(
    fileNames.map(async (fileName) => {
      const report = await redis.get(`report:${fileName}`);
      if (!report) return null;
      const parsedReport = JSON.parse(report);
      return {
        fileName,
        rating: parsedReport.rating,
        issues: parsedReport.issues,
        ELOC: parsedReport.ELOC,
      };
    })
  );

  return reports.filter(Boolean);
}
