import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditorPanel from "../components/EditorPanel";
import SnakeSpinner from "../components/SnakeSpinner"; // 👈 make sure this file exists
import PreviewPanel from "../components/PreviewPanel";

export default function PageCodeEditor() {

  const { qrCodeNumber: routeId } = useParams();
  // console.log("Assignment ID:", assignmentId);
  const qrCodeNumber = routeId || "2256";
  console.log("QR Code Number:", qrCodeNumber);

  const [appName, setAppName] = useState("");
  const [code, setCode] = useState("# NOW LOADING");
  const [isLoading, setIsLoading] = useState(false); // 👈 Spinner toggle

  useEffect(() => {
    document.title = "Snake Brain Editor";
  }, []);

  useEffect(() => {
    fetch(`https://assignment-service.fly.dev/student/assignment/${qrCodeNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch assignment");
        return res.json();
      })
      .then((data) => setAppName(data.appname))
      .catch((err) => console.error("Assignment fetch error:", err));
  }, [qrCodeNumber]);

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

          <h4 style={{ color: '#fff', textAlign: 'center', marginBottom: '1rem' }}>
            Battlesnake Preview
          </h4>

          {isLoading ? (
            <SnakeSpinner />
          ) : (
            <>
              {/* Game URL Input */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid #ff2a6d',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                <input
                  type="text"
                  placeholder="Game URL"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Fira Code', monospace",
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    backgroundColor: '#ff2a6d',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '20px',
                    marginTop: '0.5rem',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 'bold',
                  }}
                  onClick={() => setIsLoading(true)} // Example usage
                >
                  FETCH BOARD
                </button>
              </div>

              {/* Snake API Input */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid #ff2a6d',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                <input
                  type="text"
                  placeholder="Your Snake API URL"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Fira Code', monospace",
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    backgroundColor: '#ff2a6d',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '20px',
                    marginTop: '0.5rem',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 'bold',
                  }}
                >
                  CONNECT SNAKE API
                </button>
              </div>

              {/* Test Move Button */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2rem',
                }}
              >
                <button
                  style={{
                    backgroundColor: '#ff2a6d',
                    color: '#fff',
                    padding: '0.5rem 2rem',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px #ff2a6d',
                  }}
                >
                  TEST MOVE
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
