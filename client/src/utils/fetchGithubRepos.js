export const fetchGitHubRepos = async (accessToken, limit, page) => {
  const res = await fetch(
    `https://api.github.com/user/repos?per_page=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }

  return res.json();
};
