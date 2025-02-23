export const fetchGitHubRepos = async (accessToken) => {
  const res = await fetch(
    "https://api.github.com/user/repos?per_page=100&page=1",
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
