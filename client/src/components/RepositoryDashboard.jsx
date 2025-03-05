import React, { useEffect, useState } from "react";
import Head from "next/head";
import ResultTable from "./Table/ResultTable";
import { useRouter } from "next/navigation";
import Loader from "./Loader/Loader";

const ratingClasses = {
  1: "text-red-950",
  2: "text-red-900",
  3: "text-red-800/90",
  4: "text-red-700/90",
  5: "text-red-600/70",
  6: "text-red-600/60",
  7: "text-red-500/50",
  8: "text-green-600",
  9: "text-green-900",
  10: "text-green-950",
};
const languageColor = {
  JavaScript: "bg-yellow-500",
  Python: "bg-blue-500",
  Java: "bg-red-500",
  C: "bg-gray-500",
  Cpp: "bg-gray-500",
  Ruby: "bg-red-500",
  PHP: "bg-blue-500",
  HTML: "bg-yellow-500",
  CSS: "bg-blue-500",
  SCSS: "bg-blue-500",
  Shell: "bg-gray-500",
  TypeScript: "bg-blue-500",
}

const RepositoryDashboard = () => {
  const [link, setLink] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState({});
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [rating, setRating] = useState(null);
  const [overallRating, setOverallRating] = useState(null);

  useEffect(() => {
    const savedRepoUrl = localStorage.getItem("selectedRepoUrl");
    console.log(savedRepoUrl);
    if (savedRepoUrl) {
      setLink(savedRepoUrl);
    }
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [link]);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    if (!link) {
      return;
    }
    try {
      const res = await fetch("/api/runtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setFiles(data.majorReport);
        setLanguage(data.language);
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
  const sortedFiles = files.sort(
    (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
  );

  const calculateOverallRating = () => {
    let sum = 0;
    files?.forEach((file) => {
      sum += parseInt(file.rating);
    });
    return (sum / files.length).toFixed(2);
  };
  const totalLOC = () => {
    let sum = 0;
    Object.keys(language).forEach((key) => {
      sum += parseInt(language[key]);
    });
    return sum.toFixed(1);
  };
  const totalELOC = () => {
    let sum = 0;
    files?.forEach((file) => {
      sum += parseInt(file.ELOC);
    });
    return sum.toFixed(1);
  };
  const totalIssues = () => {
    let sum = 0;
    files?.forEach((file) => {
      sum += parseInt(file.issues);
    });
    return sum.toFixed(0);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="w-[40px] height-[40px]">
          <Loader width={16} height={16} />
        </div>
        <span className="text-center">
          Analyzing your code... Running tests and Preparing report. This may
          take a while. <br /> Please wait ⏳
        </span>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen p-6">
        <Head>
          <title>Repository Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="max-w-[90%] mx-auto">
          <div className="flex items-center gap-3">
            <h1 className=" text-2xl font-bold mb-6">REPOSITORY : {}</h1>
            <div className="text-sm text-gray-100 mb-4 flex items-center gap-1">
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
              >
                <path
                  d="M7.5 7.5H7a.5.5 0 00.146.354L7.5 7.5zm0 6.5A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zM14 7.5A6.5 6.5 0 017.5 14v1A7.5 7.5 0 0015 7.5h-1zM7.5 1A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zm0-1A7.5 7.5 0 000 7.5h1A6.5 6.5 0 017.5 1V0zM7 3v4.5h1V3H7zm.146 4.854l3 3 .708-.708-3-3-.708.708z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>29 May 2024 10:19</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Overall Rating */}
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-sm text-gray-600 mb-2">Overall rating</h2>
              <div
                className={`text-5xl font-bold ${
                  ratingClasses[Math.trunc(calculateOverallRating() / 10)]
                }`}
              >
                {calculateOverallRating()}%
              </div>
            </div>

            {/* Executable LOC */}
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-sm text-gray-600 mb-2">Executable LOC</h2>
              <div className="text-4xl font-bold text-gray-500">
                {totalELOC() / 1000}K
              </div>
            </div>

            {/* Total LOC */}
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-sm text-gray-600 mb-2">Total LOC</h2>
              <div className="text-4xl font-bold text-gray-500">
                {totalLOC() / 1000}K
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-sm text-gray-600 mb-2">Languages</h2>
              <div className="flex items-center justify-center">
                {
                  Object.entries(language).map(([key, value]) => {
                    let total = 0;
                    Object.values(language).forEach((val) => {
                      total += val;
                    });
                    return(
                    <div className="flex flex-col">
                      <div className={`w-12 h-12 ${languageColor[key]} rounded-full flex  items-center justify-center`}>
                        <span className="text-xs text-white">{(value/total *100).toFixed(2)}%</span>
                      </div>
                      <span className={`flex  justify-center text-xs text-gray-500`}>
                        {key}
                      </span>
                    </div>
                  )})
                }
              </div>
            </div>

            {/* Code Issues */}
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-sm text-gray-600 mb-2">Total Issues</h2>
              <div className="text-4xl font-bold text-orange-500">
                {totalIssues()}
              </div>
              <div className="text-xs text-red-500 mt-2">
                Critically high Code issue density
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ResultTable
              sortedFiles={sortedFiles}
              handleFileClick={handleFileClick}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default RepositoryDashboard;
