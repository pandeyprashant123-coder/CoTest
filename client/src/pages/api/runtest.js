import axios from "axios";
import { z } from "zod";
import Redis from "ioredis";

import analysisQueue from "./config/bull";
import {
  fetchRepoContentsJavascript,
  fetchRepoContentsPython,
} from "./services/GithubActions";
import { test } from "./services/analizer";
import { addFilesToQueue } from "./services/queue";
import { repoSchema } from "./validation/github";

const redis = new Redis();

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
    await addFilesToQueue(files, language);
    if (files.length === 0) {
      return res
        .status(404)
        .json({ error: "No files found in the repository" });
    }

    const fileNames = files.map((fileUrl) => {
      const parts = fileUrl.split("/");
      return parts[parts.length - 1]; // Extract filename from URL
    });

    res.status(200).json({ files: fileNames });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

analysisQueue.process(async (job) => {
  const { code, fileName, language } = job.data;
  console.log(`Processing file: ${fileName}`);

  if (!code) {
    console.log(`No code received for ${fileName}`);
    return;
  }

  try {
    let message;
    if (language === "Javascript") {
      message = await test(code);
    } else if (language === "Python") {
      const response = await axios.post(
        "http://127.0.0.1:8001/review_python_code",
        { code }
      );
      message = response.data;
    }

    const result = {
      code,
      message,
    };
    // Store result in Redis
    await redis.set(`report:${fileName}`, JSON.stringify(result));
    console.log(`Stored analysis for ${fileName}`);
  } catch (error) {
    console.error(`Error analyzing code for ${fileName}:`, error.message);
  }
});
