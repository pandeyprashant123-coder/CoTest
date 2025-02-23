import { useEffect, useState } from "react";

const RepositoryList = ({ accessToken }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `/api/githubRepos?page=${page}&searchTerm=${encodeURIComponent(
        searchTerm
      )}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setRepos(data);
      } else {
        setError(data.error || "Failed to load repositories");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (accessToken !== undefined) {
      fetchRepositories();
    }
  }, [page, accessToken]); // Re-fetch when page changes
  console.log(repos);
  return (
    <div className="w-full flex flex-col items-center ">
      <h2 className="font-semibold text-[20px]">GitHub Repositories List</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {repos.length > 0 && (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>Repository Name</th>
              <th>Visibility</th>
              <th>Stars</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, index) => (
              <tr key={repo.id}>
                <td>{(page - 1) * 20 + index + 1}</td>
                <td>{repo.name}</td>
                <td>{repo.private ? "Private" : "Public"}</td>
                <td>{repo.stargazers_count}</td>
                <td>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Repo
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} </span>
        <button disabled={repos.length < 20} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RepositoryList;
