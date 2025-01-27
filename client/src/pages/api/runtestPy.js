import fetch from "node-fetch"
import { spawn } from "child_process"
import { promisify } from "util"
import { tmpdir } from "os"
import { join } from "path"
import { writeFile, unlink } from "fs/promises"

const tmpDir = tmpdir()
const exec = promisify(require("child_process").exec)

async function fetchRepoContents(repoLink, path = "") {
  const [owner, repo] = repoLink.split("/").slice(-2)
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents${
    path ? `/${path}` : ""
  }`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch repository contents: ${response.statusText}`
    )
  }
  const contents = await response.json()

  let files = []
  for (const item of contents) {
    if (item.type === "file") {
      files.push(item)
    } else if (item.type === "dir") {
      const dirFiles = await fetchRepoContents(repoLink, item.path)
      files = files.concat(dirFiles)
    }
  }
  return files
}

async function fetchFileContent(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch file content: ${response.statusText}`)
  }
  return response.text()
}

async function lintPythonFile(fileContent, filePath) {
  const tmpFilePath = join(tmpDir, filePath.replace(/\//g, "_"))

  try {
    await writeFile(tmpFilePath, fileContent)
    const { stdout, stderr } = await exec(
      `pylint ${tmpFilePath} --output-format=json`
    )
    await unlink(tmpFilePath)

    if (stderr) {
      throw new Error(stderr)
    }

    return JSON.parse(stdout)
  } catch (error) {
    return { error: error.message }
  }
}

async function lintFiles(files) {
  const results = []

  for (const file of files) {
    if (file.name.endsWith(".py")) {
      const content = await fetchFileContent(file.download_url)
      const lintResults = await lintPythonFile(content, file.path)
      results.push({ filePath: file.path, lintResults })
    }
  }

  return results
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { link } = req.body
      const contents = await fetchRepoContents(link)

      const lintResults = await lintFiles(contents)
      res.status(200).json(lintResults)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
