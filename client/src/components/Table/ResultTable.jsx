import Image from "next/image";
import React, { useEffect, useState } from "react";
const ratingClasses = {
  1: "bg-red-950",
  2: "bg-red-900",
  3: "bg-red-800/90",
  4: "bg-red-700/90",
  5: "bg-red-600/70",
  6: "bg-red-600/60",
  7: "bg-red-500/50",
  8: "bg-green-600",
  9: "bg-green-900",
  10: "bg-green-950",
};
const ResultTable = ({ sortedFiles, handleFileClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredFiles, setFilteredFiles] = useState(sortedFiles);
  const [currentFiles, setCurrentFiles] = useState([]);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(sortedFiles?.length / itemsPerPage);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentFiles(filteredFiles?.slice(indexOfFirstItem, indexOfLastItem));
  }, [filteredFiles, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRatingSortAsc = () => {
    const sorted = [...filteredFiles].sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
    setFilteredFiles(sorted);
  };
  const handleRatingSortDesc = () => {
    const sorted = [...filteredFiles].sort(
      (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
    );
    setFilteredFiles(sorted);
  };
  return (
    <div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#715DE3]/40">
            <th className="py-3 px-6 text-left ">Sn</th>
            <th className="py-3 px-6 text-left">File</th>
            <th className="py-3 px-6 text-left">
              <div className="flex gap-2 items-center">
                <span>Rating</span>
                <div className="flex flex-col justify-center">
                  <Image
                    className="rotate-180 cursor-pointer"
                    onClick={handleRatingSortAsc}
                    src="/icons/down-arrow.png"
                    width={16}
                    height={16}
                    alt="Image"
                  />
                  <Image
                    className=" cursor-pointer"
                    onClick={handleRatingSortDesc}
                    src="/icons/down-arrow.png"
                    width={16}
                    height={16}
                    alt="Image"
                  />
                </div>
              </div>
            </th>
            <th className="py-3 px-6 text-left">Issues</th>
            <th className="py-3 px-6 text-left">ELOC</th>
          </tr>
        </thead>
        <tbody>
          {currentFiles?.length > 0 ? (
            currentFiles?.map((file, index) => {
              const textColor = Math.trunc(file.rating / 10);
              return (
                <tr
                  key={index}
                  className={`group hover:bg-gray-700 ${
                    index % 2 == 0 ? "bg-[#715DE3]/20" : "bg-[#715DE3]/30"
                  } cursor-pointer  transition`}
                  onClick={() => handleFileClick(file.fileName)}
                >
                  <td className="py-3 px-6">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-6">{file.fileName}</td>
                  <td className={`py-3 px-6 `}>
                    <div
                      className={`w-fit py-1 px-2 rounded-2xl ${ratingClasses[textColor]}`}
                    >
                      {Number(file.rating)}%
                    </div>
                  </td>
                  <td className={`py-3 px-6 `}>{file.issues}</td>
                  <td className={`py-3 px-6 `}>{file.ELOC}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="py-3 px-6 text-center">
                No files found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {currentFiles?.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="py-2">{`${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultTable;
