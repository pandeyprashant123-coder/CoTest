import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import RepoListModal from "./RepoListModal";
import ResultTable from "./Table/ResultTable";

const ratingClasses = {
  1: "bg-red-700",
  2: "bg-red-600",
  3: "bg-red-500",
  4: "bg-red-400",
  5: "bg-red-300",
  6: "bg-red-200",
  7: "bg-red-100",
  8: "bg-green-600",
  9: "bg-green-900",
  10: "bg-green-950",
};

export default function ImportRepo() {
  const [link, setLink] = useState(
    localStorage.getItem("selectedRepoUrl") || ""
  );
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("Javascript");
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(0);
  const router = useRouter();
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const savedRepoUrl = localStorage.getItem("selectedRepoUrl");
    if (savedRepoUrl) {
      setLink(savedRepoUrl);
    }
  }, [flag]);

  useEffect(() => {
    handleSubmit();
  }, [link]);

  console.log(link);
  const handleSubmit = async () => {
    // e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/runtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link, language }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setFiles(data.files);
        setRating(data.majorReport);
        setLoading(false);
      } else {
        setError(data.error);
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleFileClick = (fileName) => {
    const url = `/codeViewer?file=${encodeURIComponent(fileName)}`;
    window.open(url, "_blank");
  };
  const sortedFiles = [...files].sort((a, b) => rating[a] - rating[b]);

  return (
    <div className="flex w-[80%] mx-auto flex-col min-h-[30vh] items-center justify-center pt-10">
      <div
        // onSubmit={handleSubmit}
        className="p-5 flex flex-col items-center gap-3 mx-auto"
      >
        <h1>Currently selected Repo: {`${link}`}</h1>
        <div className="flex flex-row justify-center w-full mx-auto gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsModalOpen(true)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Select Repository"}
          </button>
          {isModalOpen && (
            <RepoListModal
              setIsModalOpen={setIsModalOpen}
              flag={flag}
              setFlag={setFlag}
            />
          )}
          {/* <input
            type="text"
            id="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter GitHub repo link"
            required
            className="py-3 px-6 border-[1px] border-black text-black w-[500px]"
          /> */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border-[1px] border-black text-black outline-none px-2"
          >
            <option value="Javascript">Javascript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <button
          type="submit"
          className="py-3 px-6 w-max border-[1px] border-black "
        >
          {loading ? `Loading...` : `Check Files`}
        </button>
        {/* <p>{result}</p> */}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {files?.length > 0 && (
        <div className={`px-3 w-full mx-auto  bg-black my-9 overflow-y-auto`}>
          <h2 className="mb-4 font-bold text-xl text-center">Results</h2>
          {/* <ul>
            {files?.length > 0 ? (
              sortedFiles?.map((file, index) => {
                const textColor = Math.trunc(rating[file] / 10);
                return (
                  <li
                    key={index}
                    className={`py-3 px-6 ${ratingClasses[textColor]}    border-gray-100  mt-1 cursor-pointer hover:bg-gray-700 transition flex justify-between`}
                    onClick={() => handleFileClick(file)}
                  >
                    <p>{file}</p>
                    <p>{Number(rating[file])}%</p>
                  </li>
                );
              })
            ) : (
              <p>No files found.</p>
            )}
          </ul> */}

          {/* <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#715DE3]/40">
                <th className="py-3 px-6 text-left">Sn</th>
                <th className="py-3 px-6 text-left">File</th>
                <th className="py-3 px-6 text-left">Rating</th>
              </tr>
            </thead>
            <tbody>
              {files?.length > 0 ? (
                sortedFiles?.map((file, index) => {
                  const textColor = Math.trunc(rating[file] / 10);
                  return (
                    <tr
                      key={index}
                      className={`group hover:bg-gray-700 ${
                        index % 2 == 0 ? "bg-[#715DE3]/20" : "bg-[#715DE3]/30"
                      } cursor-pointer  transition`}
                      onClick={() => handleFileClick(file)}
                    >
                      <td className="py-3 px-6">{index + 1}</td>
                      <td className="py-3 px-6">{file}</td>
                      <td className={`py-3 px-6 `}>
                        <div
                          className={`w-fit py-1 px-2 rounded-2xl ${ratingClasses[textColor]}`}
                        >
                          {Number(rating[file])}%
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="2" className="py-3 px-6 text-center">
                    No files found.
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
          
          <ResultTable
            sortedFiles={sortedFiles}
            rating={rating}
            handleFileClick={handleFileClick}
          />
        </div>
      )}
    </div>
  );
}
