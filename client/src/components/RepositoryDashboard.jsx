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
};

const RepositoryDashboard = () => {
  const [link, setLink] = useState("");
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState({});
  const [files, setFiles] = useState([]);

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
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.trim().split("\n");
        lines.forEach((line) => {
          const data = JSON.parse(line.replace("data: ", ""));
          if (data.logs) {
            setLoading(false);
            setLogs((prevLogs) => [...prevLogs, ...data.logs]);
          }
          console.log(logs);
          if (data.majorReport) {
            setFiles(data.majorReport);
            setLanguage(data.language);
            eventSource.close(); // Close connection when final report is received
          }
        });
      }
      // if (res.ok) {
      //   console.log(data);
      //   setFiles(data.majorReport);
      //   setLanguage(data.language);
      //   setLoading(false);
      // } else {
      //   setError(data.error);
      //   setLoading(false);
      // }
    } catch (err) {
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
            <h1 className=" text-2xl font-bold mb-6">
              REPOSITORY : {link.split("/")[link.split("/").length - 1]}
            </h1>
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
                {Object.entries(language).map(([key, value]) => {
                  let total = 0;
                  Object.values(language).forEach((val) => {
                    total += val;
                  });
                  return (
                    <div className="flex flex-col">
                      <div
                        className={`w-12 h-12 ${languageColor[key]} rounded-full flex  items-center justify-center`}
                      >
                        <span className="text-xs text-white">
                          {((value / total) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <span
                        className={`flex  justify-center text-xs text-gray-500`}
                      >
                        {key}
                      </span>
                    </div>
                  );
                })}
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
