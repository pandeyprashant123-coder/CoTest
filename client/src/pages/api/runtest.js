import axios from "axios";
import Parser from "tree-sitter";
import Javascript from "tree-sitter-javascript";
import path from "path";

import analysisQueue from "./modules/bull";
import lintCode from "./modules/esanalizer";
import analyzeCode from "./modules/customanalizer";

const parser = new Parser();
parser.setLanguage(Javascript);

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN}`,
  },
});

const allowedExtensions = [".js", ".jsx", ".ts", ".tsx"];

async function fetchRepoContents(repoLink, dir = "") {
  const [owner, repo] = repoLink.split("/").slice(-2);
  try {
    const url = `/repos/${owner}/${repo}/contents/${dir ? `/${dir}` : ""}`;
    const response = await githubApi.get(url);

    const files = [];
    for (const item of response.data) {
      if (
        item.type === "file" &&
        allowedExtensions.some((ext) => item.name.endsWith(ext)) &&
        !item.name.includes(".config.js") &&
        !item.name.includes(".test.js") &&
        !item.name.includes(".config.ts")
      ) {
        files.push(item.download_url);
      } else if (
        item.type === "dir" &&
        item.name !== "node_modules" &&
        item.name !== "test" &&
        item.name !== "styles"
      ) {
        const nestedFiles = await fetchRepoContents(repoLink, item.path);
        files.push(...nestedFiles);
      }
    }

    return files;
  } catch (error) {
    console.error(`Error fetching repo files: ${error.message}`);
    return [];
  }
}

async function fetchCodeFromLink(link) {
  try {
    const response = await githubApi.get(link);
    return response.data;
  } catch (error) {
    console.error("Error fetching file content:", error.message);
  }
}

async function addFilesToQueue(fileUrls) {
  for (const fileUrl of fileUrls) {
    const fileName = path.basename(fileUrl);

    try {
      const code = await fetchCodeFromLink(fileUrl);
      // console.log(`Fetched code for ${fileName}:`, code);
      if (code) {
        analysisQueue.add({ code, fileName });
        console.log(`Added ${fileName} to the queue.`);
      } else {
        console.log(`No code found for ${fileName}.`);
      }
    } catch (error) {
      console.error(`Error processing ${fileUrl}: ${error.message}`);
    }
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { link } = req.body;
      const jsFiles = await fetchRepoContents(link);
      console.log(`Found ${jsFiles.length} JavaScript files in the repo.`);
      await addFilesToQueue(jsFiles);
      // const code = await fetchCodeFromLink(jsFiles[0]);
      // const message = await lintCode(code);
      // console.log(message);
      res.status(200).json(jsFiles);
    } catch (error) {
      console.error("Error in handler:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

analysisQueue.process(async (job) => {
  const { code, fileName } = job.data;

  console.log(`Processing file: ${fileName}`);
  if (!code) {
    console.log(`No code received for ${fileName}`);
    return;
  }

  try {
    const message = await lintCode(code);
    // console.log(`Analysis result for ${fileName}: ${message}`);
    console.log(message);
  } catch (error) {
    console.error(`Error analyzing code for ${fileName}:`, error.message);
  }
});
