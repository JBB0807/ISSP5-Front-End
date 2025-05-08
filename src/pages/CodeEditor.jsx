import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EditorPanel from "../components/EditorPanel";
import PreviewPanel from "../components/PreviewPanel";

const ASSIGNMENT_BASE = "http://localhost:8082";

export default function PageCodeEditor() {

  const location = useLocation();
  const qrCodeNumber = location.state?.qrCodeNumber;

  console.log("QR Code Number:", qrCodeNumber);

  const [appName, setAppName] = useState("");
  const [code, setCode] = useState("# NOW LOADING");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    document.title = "Snake Brain Editor";
  }, []);

  useEffect(() => {
    fetch(`${ASSIGNMENT_BASE}/student/assignment/${qrCodeNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch assignment");
        return res.json();
      })
      .then((data) => setAppName(data.appname))
      .catch((err) => console.error("Assignment fetch error:", err));
  }, [qrCodeNumber]);

  useEffect(() => {
    if (!appName) return;
    fetch(`${ASSIGNMENT_BASE}/notebook/${appName}`)
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

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const res = await fetch(`${ASSIGNMENT_BASE}/student/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName, code })
      });
      if (!res.ok) throw new Error("Save failed");
      alert("Notebook saved");
    } catch (err) {
      console.error("Save error:", err);
      alert(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeploy = async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    try {
      const res = await fetch(`${ASSIGNMENT_BASE}/student/restart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName })
      });
      if (!res.ok) throw new Error("Restart failed");
      alert("App restarted");
    } catch (err) {
      console.error("Restart error:", err);
      alert(`Restart error: ${err.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <main className="code-editor-page" style={{ paddingTop: "35px", width: "100vw" }}>
      <div
        className="editor-page-layout"
        style={{
          display: "grid",
          gridTemplateColumns: '1fr 0.8fr',
          //gap: "1rem",
          width: "100%",
          padding: "1rem",
          fontFamily: "'Fira Code', 'Courier New', monospace"
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
            height: "100%",
            overflow: "auto",
          }}
        >
          <h3
            className="panel-heading"
            style={{
              fontSize: "1.2rem",
              color: "#05d9e8",
              textShadow: "0 0 5px #05d9e8",
              marginBottom: "1rem"
            }}
          >
            🐍 Snake Brain (Python)
          </h3>
          <EditorPanel code={code} onChange={setCode} />
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                backgroundColor: "#ff2a6d",
                color: "#fff",
                padding: "0.5rem 2rem",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: isSaving ? "not-allowed" : "pointer"
              }}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>


            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              style={{
                marginLeft: "1rem",
                backgroundColor: "#ff2a6d",
                color: "#fff",
                padding: "0.5rem 2rem",
                border: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: isDeploying ? "not-allowed" : "pointer"
              }}
            >
              {isDeploying ? "Deploying..." : "Deploy"}
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
            padding: "0.8rem",
            color: "#eee",
            minHeight: "20vh"
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              color: "#d300c5",
              textShadow: "0 0 5px #d300c5",
              marginBottom: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem"
            }}
          >
            🎯 Live Arena Output
          </h3>
          <h4
            style={{
              color: "#fff",
              textAlign: "center",
              marginBottom: "0.8rem"
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
