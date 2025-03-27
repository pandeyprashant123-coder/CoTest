import { githubApi } from "../config/github";

export async function fetchRepoContents(repoLink, dir = "") {
  const [owner, repo] = repoLink.split("/").slice(-2);
  const allowedExtensionsJs = [".js", ".jsx", ".ts", ".tsx"];

  try {
    const url = `/repos/${owner}/${repo}/contents${dir ? `/${dir}` : ""}`;
    const response = await githubApi.get(url);
    if (!response.ok) {
      console.log("unauthorized");
    }
    const languageurl = `/repos/${owner}/${repo}/languages`;
    const reponse2 = await githubApi.get(languageurl);
    const language = reponse2.data;

    const pythonFiles = [];
    const jsFiles = [];

    for (const item of response.data) {
      if (item.type === "file") {
        if (
          !item.name.includes(".config.js") &&
          !item.name.includes(".test.js") &&
          !item.name.includes(".json") &&
          !item.name.includes(".config.ts")
        ) {
          if (item.name.endsWith(".py")) {
            pythonFiles.push(item.download_url);
          } else if (
            allowedExtensionsJs.some((ext) => item.name.endsWith(ext))
          ) {
            jsFiles.push(item.download_url);
          }
        }
      } else if (
        item.type === "dir" &&
        !["node_modules", "test", "styles"].includes(item.name)
      ) {
        const nestedFiles = await fetchRepoContents(repoLink, item.path);
        pythonFiles.push(...nestedFiles.pythonFiles);
        jsFiles.push(...nestedFiles.jsFiles);
      }
    }

    return { pythonFiles, jsFiles, language };
  } catch (error) {
    console.error(`Error fetching repo files: ${error.message}`);
    return { pythonFiles: [], jsFiles: [], language: [] };
  }
}

export async function fetchCodeFromLink(link) {
  try {
    const response = await githubApi.get(link);
    return response.data;
  } catch (error) {
    console.error("Error fetching file content:", error.message);
  }
}
