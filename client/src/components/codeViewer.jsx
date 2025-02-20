import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import Monaco dynamically (avoiding SSR issues)
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const severityMap = {
  2: 1, // Info (Blue)
  4: 4, // Warning (Yellow)
  8: 8, // Error (Red)
};

export default function CodeAnalysisView() {
  const [codeData, setCodeData] = useState({
    content: `import random
n = input()
print(n + 1)`,
    language: "python",
    analysis: [
      { message: 'Unused import: "random"', severity: 2, line: 1, column: 1 }, // Info (Blue)
      {
        message: "Type error: Can't add string and int",
        severity: 8,
        line: 3,
        column: 2,
      }, // Error (Red)
      {
        message: "Consider converting input to integer",
        severity: 4,
        line: 2,
        column: 1,
      }, // Warning (Yellow)
    ],
  });

  const [markers, setMarkers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("python");

  useEffect(() => {
    fetch("/api/get-code-analysis")
      .then((res) => res.json())
      .then((data) => {
        setCodeData(data);
        setSelectedLanguage(data.language || "python");
      })
      .catch(() => console.error("Error fetching code analysis"));
  }, []);

  useEffect(() => {
    setMarkers(
      codeData.analysis.map((error) => ({
        message: error.message,
        severity: severityMap[error.severity] || 1,
        startLineNumber: error.line,
        startColumn: error.column,
        endLineNumber: error.line,
        endColumn: error.column + 1, // Ensure endColumn > startColumn for highlighting
      }))
    );
  }, [codeData]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-6">
      {/* Header with Language Selector */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Code Viewer with Error Highlighting
        </h2>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Code Editor */}
      <div className="flex-grow rounded-lg overflow-hidden border border-gray-700">
        <Editor
          height="500px"
          defaultLanguage={selectedLanguage}
          value={codeData.content}
          options={{
            readOnly: true,
            theme: "vs-dark",
            scrollBeyondLastLine: false,
            minimap: { enabled: true },
          }}
          onMount={(editor, monaco) => {
            // Set markers after Monaco editor is mounted
            monaco.editor.setModelMarkers(editor.getModel(), "owner", markers);
          }}
        />
      </div>
    </div>
  );
}
