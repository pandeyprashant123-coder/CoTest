export default async function handler(req, res) {
  const accessToken = req.headers.authorization?.split(" ")[1]; // Extract token
  const { page = 1 } = req.query;

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await fetch(
      `https://api.github.com/user/repos?visibility=all&per_page=20&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
}
