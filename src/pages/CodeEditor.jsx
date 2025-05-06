import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorPanel from "../components/EditorPanel";
import PreviewPanel from "../components/PreviewPanel";

export default function PageCodeEditor() {
  const { assignmentId: routeId } = useParams();
  const assignmentId = routeId || "52";

  const [appName, setAppName] = useState("");
  const [code, setCode] = useState("# NOW LOADING");

  useEffect(() => {
    document.title = "Snake Brain Editor";
  }, []);

  useEffect(() => {
    fetch(`https://assignment-service.fly.dev/student/assignment/${assignmentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch assignment");
        return res.json();
      })
      .then((data) => setAppName(data.appname))
      .catch((err) => console.error("Assignment fetch error:", err));
  }, [assignmentId]);

  useEffect(() => {
    if (!appName) return;
    fetch(`https://assignment-service.fly.dev/notebook/${appName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notebook");
        return res.json();
      })
      .then((notebook) => {
        const combined = notebook.cells
          .filter((cell) => cell.cell_type === "code")
          .map((cell) => cell.source.join(""))
          .join("\n\n");
        setCode(combined);
      })
      .catch((err) => console.error("Notebook fetch error:", err));
  }, [appName]);

  return (
    <main className="code-editor-page" style={{ paddingTop: "35px" }}>
      <div
        className="editor-page-layout"
        style={{
          display: "flex",
          gap: "1rem",
          width: "120rem",
          padding: "1rem",
          fontFamily: "'Fira Code', 'Courier New', monospace",
        }}
      >
        {/* Python Editor */}
        <div
          className="box-panel"
          style={{
            flex: 2,
            background: "linear-gradient(145deg, #0d0221, #1a1a1a)",
            borderRadius: "10px",
            padding: "1rem",
            color: "#eee",
            minHeight: "80vh",
            overflow: "auto",
          }}
        >
          <h3
            className="panel-heading"
            style={{
              fontSize: "1.2rem",
              color: "#05d9e8",
              textShadow: "0 0 5px #05d9e8",
              marginBottom: "1rem",
            }}
          >
            🐍 Snake Brain (Python)
          </h3>
          <EditorPanel code={code} onChange={setCode} />
          <div style={{ marginTop: "1rem", display: "flex" }}>
            <button
              style={{
                backgroundColor: "#ff2a6d",
                color: "#fff",
                padding: "0.5rem 2rem",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              style={{
                backgroundColor: "#ff2a6d",
                color: "#fff",
                padding: "0.5rem 2rem",
                marginLeft: "1rem",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Deploy
            </button>
          </div>
        </div>

        {/* Live Arena */}
        <div
          className="box-panel"
          style={{
            flex: 1,
            background: "#1a1a1a",
            borderRadius: "12px",
            padding: "1rem",
            color: "#eee",
            minHeight: "80vh",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              color: "#d300c5",
              textShadow: "0 0 5px #d300c5",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            🎯 Live Arena Output
          </h3>
          <h4
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Battlesnake Preview
          </h4>
          <PreviewPanel code={code} />
        </div>
      </div>
    </main>
  );
}
