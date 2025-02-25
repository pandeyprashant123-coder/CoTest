import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function ImportRepo() {
  const [link, setLink] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("Javascript");
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [rating, setRating] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="flex w-[70%] mx-auto flex-col min-h-[30vh] items-center justify-center pt-10">
      <form
        onSubmit={handleSubmit}
        className="p-5 flex flex-col items-center gap-3 mx-auto"
      >
        <div className="flex flex-row w-full mx-auto gap-3">
          <input
            type="text"
            id="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter GitHub repo link"
            required
            className="p-2 border-[1px] border-black text-black w-[500px]"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border-[1px] border-black"
          >
            <option value="Javascript">Javascript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <button type="submit" className="p-2 w-max border-[1px] border-black">
          {loading ? `Loading...` : `Check Files`}
        </button>
        {/* <p>{result}</p> */}
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {files?.length > 0 && (
        <div className="p-3 w-[90%] mx-auto border-[1px] rounded-md bg-gray-200">
          <h2 className="mb-4 font-bold text-xl">Results</h2>
          <ul>
            {files?.length > 0 ? (
              files?.map((file, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-100 rounded mt-1 cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => handleFileClick(file)}
                >
                  {file}
                  {rating[file]}
                </li>
              ))
            ) : (
              <p>No files found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
