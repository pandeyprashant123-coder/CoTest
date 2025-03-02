import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { set } from "zod";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const severitydecoration = {
  1: { color: "yellow", className: "low-marker" }, // Info
  // 2: { color: "blue", className: "medium-marker" }, // Info
  4: { color: "orange", className: "warning-marker" }, // Info
  8: { color: "red", className: "error-marker" }, // Error
};

export default function CodeViewer() {
  const router = useRouter();
  const { file } = router.query;

  const [codeData, setCodeData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [rating, setRating] = useState(0);
  const [severityList, setSeverityList] = useState([]);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (!file) return;

    fetch(`/api/get-report?fileName=${file}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCodeData(data.code);
        setRating(data.rating);
        console.log(data.message);
        setLanguage(data.language);
        setSeverityList((prevList) => {
          const newSeverities =
            data.message?.map(({ severity }) => {
              const newSeverity = severity;
              return newSeverity;
            }) || [];
          return [...prevList, ...newSeverities];
        });
        console.log(severityList);
        setMarkers(
          data.message?.map((error) => {
            const marker = {
              message: error.message,
              severity: 1,
              startLineNumber: error.line,
              startColumn: error.column,
              endLineNumber: error.line,
              endColumn: error.endColumn || 3,
            };
            console.log("Marker:", marker);
            return marker;
          }) || []
        );
      })
      .catch((error) => {
        console.error("Error fetching code analysis:", error);
        setCodeData("Failed to load code.");
      });
  }, [file]);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Code Report: {file || "N/A"}</h2>

      {codeData ? (
        <Editor
          height="800px"
          language="javascript"
          value={codeData}
          options={{ readOnly: true }}
          loading={<p>Loading editor...</p>}
          onMount={(editor, monaco) => {
            const model = editor.getModel();
            if (model) {
              monaco.editor.setModelMarkers(model, "owner", markers);
              const decorations = markers.map((marker, index) => ({
                range: new monaco.Range(
                  marker.startLineNumber,
                  marker.startColumn,
                  marker.endLineNumber,
                  marker.endColumn
                ),
                options: {
                  inlineClassName:
                    severitydecoration[severityList[index]]?.className ||
                    "default-marker",
                },
              }));
              editor.createDecorationsCollection(decorations);
            }
          }}
        />
      ) : (
        <p>Loading code...</p>
      )}
    </div>
  );
}
