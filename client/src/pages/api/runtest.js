import axios from "axios";

import analysisQueue from "./config/bull";
import {
  fetchRepoContentsJavascript,
  fetchRepoContentsPython,
} from "./services/GithubActions";
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
    const { link, language } = repoSchema.parse(req.body);
    let files;

    if (language === "Javascript") {
      files = await fetchRepoContentsJavascript(link);
    } else if (language === "Python") {
      files = await fetchRepoContentsPython(link);
    }

    if (!files || files.length === 0) {
      return res
        .status(404)
        .json({ error: "No files found in the repository" });
    }

    await addFilesToQueue(files, language);

    // Wait for analysis to complete before sending response
    await waitForAnalysisCompletion(files);

    // Retrieve all reports from Redis
    const majorReport = await getAllReports(files);
    const fileNames = files.map((file) => {
      return extractFileNameFromURL(file);
    });
    console.log(majorReport);

    res.status(200).json({ majorReport });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Process analysis queue
analysisQueue.process(async (job) => {
  const { code, fileName, language } = job.data;
  console.log(`Processing file: ${fileName}`);

  if (!code) {
    console.log(`No code received for ${fileName}`);
    return;
  }

  try {
    let message;
    let ELOC;
    if (language === "Javascript") {
      const tree = parser.parse(code);
      const LOC = calculateELOC(tree.rootNode);
      ELOC = LOC;
      message = await test(code, tree);
    } else if (language === "Python") {
      const response = await axios.post(process.env.PYHON_API_URL, { code });
      message = response.data;
    }
    const rating = calculatePerformanceRating(message);
    console.log(rating, ELOC);
    const issues = message.length;

    // Store analysis result in Redis
    const result = {
      code,
      message,
      rating,
      language,
      issues,
      ELOC,
    };
    await redis.set(`report:${fileName}`, JSON.stringify(result));

    console.log(`Stored analysis for ${fileName}`);
  } catch (error) {
    console.error(`Error analyzing code for ${fileName}:`, error.message);
  }
});

async function waitForAnalysisCompletion(files) {
  const fileNames = files.map((file) => extractFileNameFromURL(file));

  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const results = await Promise.all(
        fileNames.map(async (fileName) => redis.get(`report:${fileName}`))
      );

      // Check if all files have been processed
      if (results.every((result) => result !== null)) {
        clearInterval(interval);
        resolve();
      }
    }, 500); // Check every 500ms
  });
}

// Retrieve all reports from Redis
async function getAllReports(files) {
  const fileNames = files.map((file) => extractFileNameFromURL(file));

  const reports = await Promise.all(
    fileNames.map(async (fileName) => {
      const report = await redis.get(`report:${fileName}`);
      const newReport = JSON.parse(report);
      const majorReport = {
        fileName,
        rating: newReport.rating,
        issues: newReport.issues,
        ELOC: newReport.ELOC,
      };
      return report ? majorReport : {};
    })
  );
  return reports;
}
