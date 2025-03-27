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

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  try {
    const { link } = repoSchema.parse(req.body);
    const {
      pythonFiles = [],
      jsFiles = [],
      language = [],
    } = await fetchRepoContents(link);

    if (jsFiles.length === 0 && pythonFiles.length === 0) {
      res.write(
        `data: ${JSON.stringify({
          error: "No files found in the repository",
        })}\n\n`
      );
      return res.end();
    }

    await Promise.all([
      addFilesToQueue(jsFiles, "Javascript"),
      addFilesToQueue(pythonFiles, "Python"),
    ]);

    const allFiles = [...jsFiles, ...pythonFiles];

    const logInterval = setInterval(async () => {
      const logs = await redis.lrange("analysis_logs", 0, -1);
      console.log(logs);
      if (logs.length > 0) {
        res.write(`data: ${JSON.stringify({ logs })}\n\n`);
        await redis.del("analysis_logs");
      }
    }, 500);

    const majorReport = await getAllReports(allFiles);

    res.write(`data: ${JSON.stringify({ majorReport, language })}\n\n`);
    clearInterval(logInterval);
    res.end();
  } catch (error) {
    console.error("Handler Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

analysisQueue.process(async (job) => {
  const { code, fileName, language } = job.data;
  // console.log(`Processing file: ${fileName} in ${language}`);
  await redis.lpush(
    "analysis_logs",
    `Processing file: ${fileName} in ${language}`
  );

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
      const code_report = response.data;
      message = code_report.errors;
      ELOC = code_report.total_eloc;
    }

    const rating = calculatePerformanceRating(message || []);
    const issues = Array.isArray(message) ? message.length : 0;

    const result = { code, message, rating, language, issues, ELOC };
    await redis.set(`report:${fileName}`, JSON.stringify(result));
  } catch (error) {
    console.error(`Error analyzing code for ${fileName}:`, error);
    await redis.lpush(
      "analysis_logs",
      `Error analyzing ${fileName}: ${error.message}`
    );
  }
});

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
