import { githubApi } from "../config/github";

export async function fetchRepoContents(repoLink, dir = "") {
  const [owner, repo] = repoLink.split("/").slice(-2);
  const allowedExtensionsJs = [".js", ".jsx", ".ts", ".tsx"];

  try {
    const url = `/repos/${owner}/${repo}/contents${dir ? `/${dir}` : ""}`;
    const response = await githubApi.get(url);

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

    return { pythonFiles, jsFiles };
  } catch (error) {
    console.error(`Error fetching repo files: ${error.message}`);
    return { pythonFiles: [], jsFiles: [] };
  }
}

export async function fetchRepoContentsJavascript(repoLink, dir = "") {
  const [owner, repo] = repoLink.split("/").slice(-2);
  try {
    const url = `/repos/${owner}/${repo}/contents/${dir ? `/${dir}` : ""}`;
    const response = await githubApi.get(url);

    const files = [];
    for (const item of response.data) {
      if (
        item.type === "file" &&
        allowedExtensionsJs.some((ext) => item.name.endsWith(ext)) &&
        !item.name.includes(".config.js") &&
        !item.name.includes(".test.js") &&
        !item.name.includes(".config.ts")
      ) {
        const decodedURI = decodeURIComponent(item.download_url);
        files.push(decodedURI);
      } else if (
        item.type === "dir" &&
        item.name !== "node_modules" &&
        item.name !== "test" &&
        item.name !== "styles"
      ) {
        const nestedFiles = await fetchRepoContentsJavascript(
          repoLink,
          item.path
        );
        files.push(...nestedFiles);
      }
    }

    return files;
  } catch (error) {
    console.error(`Error fetching repo files: ${error.message}`);
    return [];
  }
}
export async function fetchRepoContentsPython(repoLink, dir = "") {
  const [owner, repo] = repoLink.split("/").slice(-2);
  try {
    const url = `/repos/${owner}/${repo}/contents/${dir ? `/${dir}` : ""}`;
    const response = await githubApi.get(url);

    const files = [];
    const allowedExtensions = [".py"];
    for (const item of response.data) {
      if (
        item.type === "file" &&
        allowedExtensions.some((ext) => item.name.endsWith(ext))
      ) {
        const decodedURI = decodeURIComponent(item.download_url);
        files.push(decodedURI);
      } else if (
        item.type === "dir" &&
        item.name !== "images" &&
        item.name !== "test" &&
        item.name !== "styles"
      ) {
        const nestedFiles = await fetchRepoContentsPython(repoLink, item.path);
        files.push(...nestedFiles);
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
