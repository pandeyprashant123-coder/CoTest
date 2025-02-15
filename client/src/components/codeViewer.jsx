import Editor from "@monaco-editor/react";
import "./codeviewer.css";

function CodeViewer({ code, errors }) {
  // Add markers for errors
  const editorOptions = {
    readOnly: true,
    minimap: { enabled: false },
    lineNumbers: "on",
  };

  // Highlight error lines
  const handleEditorMount = (editor) => {
    const markers = errors.map((error) => ({
      startLineNumber: error.line,
      endLineNumber: error.line,
      startColumn: 1,
      endColumn: 100, // Arbitrary large number to cover the line
      message: error.message,
      severity: 8, // MarkerSeverity.Warning
    }));
    editor.setModelMarkers(editor.getModel(), "owner", markers);
  };

  return (
    <Editor
      height="500px"
      language="python"
      value={code}
      options={editorOptions}
      onMount={handleEditorMount}
    />
  );
}

function ErrorList({ errors, onErrorClick }) {
  return (
    <div className="error-sidebar">
      <h3>Issues ({errors.length})</h3>
      <ul>
        {errors.map((error) => (
          <li
            key={`${error.line}-${error.message}`}
            onClick={() => onErrorClick(error.line)}
          >
            Line {error.line}: {error.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CodeAnalysisView() {
  const [codeData, setCodeData] = useState(null);

  // Fetch code and analysis results from your backend API
  useEffect(() => {
    fetch("/api/get-code-analysis")
      .then((res) => res.json())
      .then(setCodeData);
  }, []);

  if (!codeData) return <div>Loading...</div>;

  return (
    <div className="code-analysis-container">
      <ErrorList
        errors={codeData.analysis}
        onErrorClick={(line) => {
          const editor = document.querySelector(".monaco-editor");
          editor.revealLineInCenter(line); // Scroll to line
        }}
      />
      <CodeViewer code={codeData.content} errors={codeData.analysis} />
    </div>
  );
}
