import axios from "axios";

import analysisQueue from "./config/bull";
import { fetchRepoContents } from "./services/GithubActions";
import { test } from "./services/analizer";
import { addFilesToQueue } from "./services/queue";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { link, language } = req.body;
      const files = await fetchRepoContents(link, language);
      console.log(`Found ${files.length} ${language} files in the repo.`);
      await addFilesToQueue(files, language);
      // const code = await fetchCodeFromLink(jsFiles[0]);
      // const message = await lintCode(code);
      // console.log(message);
      res.status(200).json(files);
    } catch (error) {
      console.error("Error in handler:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
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
    if (language === "Javascript") {
      const message = await test(code);
      console.log(`Analysis result for ${fileName}: ${message}`);
    } else if (language === "Python") {
      axios
        .post("http://127.0.0.1:8001/review_python_code", { code })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error analyzing code:", error.message);
        });
    }

    // console.log(`Analysis result for ${fileName}: ${message}`);
  } catch (error) {
    console.error(`Error analyzing code for ${fileName}:`, error.message);
  }
});
