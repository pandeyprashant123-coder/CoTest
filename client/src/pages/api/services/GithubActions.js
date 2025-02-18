import { githubApi } from "../config/github";

export async function fetchRepoContents(repoLink, language, dir = "") {
  const [owner, repo] = repoLink.split("/").slice(-2);
  try {
    const url = `/repos/${owner}/${repo}/contents/${dir ? `/${dir}` : ""}`;
    const response = await githubApi.get(url);

    const files = [];
    if (language === "Python") {
      console.log("hi");
      const allowedExtensions = [".py"];
      for (const item of response.data) {
        if (
          item.type === "file" &&
          allowedExtensions.some((ext) => item.name.endsWith(ext))
        ) {
          files.push(item.download_url);
        } else if (
          item.type === "dir" &&
          item.name !== "images" &&
          item.name !== "test" &&
          item.name !== "styles"
        ) {
          const nestedFiles = await fetchRepoContents(repoLink, item.path);
          files.push(...nestedFiles);
        }
      }
    } else if (language === "Javascript") {
      const allowedExtensions = [".js", ".jsx", ".ts", ".tsx"];
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
    }

    return files;
  } catch (error) {
    console.error(`Error fetching repo files: ${error.message}`);
    return [];
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
