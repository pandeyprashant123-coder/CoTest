import axios from "axios";
import { atob } from "atob";

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
        !item.name.includes(".test.js")
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

// async function fetchFileContent(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch file content: ${response.statusText}`);
//   }
//   return response.text();
// }

// async function lintFiles(files) {
//   const eslint = new ESLint();
//   const results = [];

//   for (const file of files) {
//     if (file.name.endsWith(".js")) {
//       const content = await fetchFileContent(file.download_url);
//       const lintResults = await eslint.lintText(content, {
//         filePath: file.path,
//       });
//       results.push(...lintResults);
//     }
//   }

//   return results;
// }

async function fetchCodeFromLink(link) {
  try {
    const response = await githubApi.get(link);
    const { content, encoding } = response.data;

    if (encoding === "base64") {
      const decodedContent = atob(content);
      console.log(decodedContent);
    } else {
      console.log("Unsupported encoding:", encoding);
    }
  } catch (error) {
    console.error("Error fetching file content:", error.message);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { link } = req.body;
      const jsFiles = await fetchRepoContents(link); //returns an array of link

      // const lintResults = await lintFiles(contents);
      // console.log(lintResults);
      console.log(jsFiles);
      res.status(200).json("done");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
