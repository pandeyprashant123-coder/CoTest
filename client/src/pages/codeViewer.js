import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

// Import Monaco dynamically (avoiding SSR issues)
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const severityMap = {
  2: 1, // Info (Blue)
  4: 4, // Warning (Yellow)
  8: 8, // Error (Red)
}

export default function codeViewer() {
  const router = useRouter()
  const { file } = router.query // Get the file name from the URL

  const [codeData, setCodeData] = useState(null)
  const [markers, setMarkers] = useState([])

  console.log(codeData?.message)
  useEffect(() => {
    if (!file) return

    fetch(`/api/get-report?fileName=${file}`)
      .then((res) => res.json())
      .then((data) => {
        setCodeData(data)
        setMarkers(
          data.message?.map((error) => ({
            message: error.message,
            severity: severityMap[error.severity] || 1,
            startLineNumber: error.line,
            startColumn: error.column,
            endLineNumber: error.line,
            endColumn: error.column + 1,
          }))
        )
      })
      .catch((error) => console.error("Error fetching code analysis:", error))
  }, [file])

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Code Report: {file}</h2>

      {codeData ? (
        <Editor
          height="800px"
          defaultLanguage="python"
          value={codeData.code}
          options={{ readOnly: true }}
          onMount={(editor, monaco) => {
            monaco.editor.setModelMarkers(editor.getModel(), "owner", markers)
          }}
        />
      ) : (
        <p>Loading code...</p>
      )}
    </div>
  )
}
