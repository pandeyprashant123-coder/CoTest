function extractFileNameFromURL(fileUrl) {
  const parts = new URL(fileUrl).pathname.split("/");
  const repoIndex = parts.indexOf("main"); // Match the logic in addFilesToQueue
  return repoIndex !== -1
    ? parts.slice(repoIndex + 1).join("/")
    : parts.slice(4).join("/");
}
export default extractFileNameFromURL;
