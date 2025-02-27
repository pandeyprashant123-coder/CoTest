import { fetchGitHubRepos } from "@/utils/fetchGithubRepos";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RepoListModal = ({ setIsModalOpen, flag = 0, setFlag = () => {} }) => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    setLoading(true);
    if (session?.accessToken) {
      fetchGitHubRepos(session.accessToken, limit, page)
        .then(setRepos)
        .catch(console.error);
      setLoading(false);
    }
  }, [session, page]);

  const handleSelectRepo = (repoUrl) => {
    localStorage.setItem("selectedRepoUrl", repoUrl);
    alert(`Repository URL saved: ${repoUrl}`);
    setIsModalOpen(false);
    setFlag(flag + 1);
    navigate.push("/check");
  };
  console.log(repos);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-5 rounded-md shadow-lg w-[50%]">
        <h2 className="text-xl font-bold mb-4">Select a Repository</h2>

        {repos.length > 0 ? (
          <ul className="max-h-[300px] overflow-y-auto">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectRepo(repo.html_url)}
              >
                {repo.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No repositories found.</p>
        )}

        <div className="flex justify-center gap-4">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span> Page {page} </span>
          <button
            disabled={repos.length < 20}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RepoListModal;
