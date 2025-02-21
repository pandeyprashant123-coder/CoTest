import analysisQueue from "../config/bull";
import { fetchCodeFromLink } from "./GithubActions";
import path from "path";

export async function addFilesToQueue(fileUrls, language) {
  for (const fileUrl of fileUrls) {
    const fileName = path.basename(fileUrl);

    try {
      const code = await fetchCodeFromLink(fileUrl);
      // console.log(`Fetched code for ${fileName}:`, code);
      if (code) {
        analysisQueue.add({ code, fileName, language });
        console.log(`Added ${fileName} to the queue.`);
      } else {
        console.log(`No code found for ${fileName}.`);
      }
    } catch (error) {
      console.error(`Error processing ${fileUrl}: ${error.message}`);
    }
  }
}
