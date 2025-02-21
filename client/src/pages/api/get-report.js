import Redis from "ioredis";

const redis = new Redis();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fileName } = req.query;
  if (!fileName) {
    return res.status(400).json({ error: "File name is required" });
  }

  try {
    const report = await redis.get(`report:${fileName}`);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(JSON.parse(report));
  } catch (error) {
    console.error("Error fetching report:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
