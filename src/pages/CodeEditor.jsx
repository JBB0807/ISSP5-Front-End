import { useEffect, useState } from "react";
import EditorPanel from "../components/EditorPanel";
import PreviewPanel from "../components/PreviewPanel";

const PageCodeEditor = () => {
  const [code, setCode] = useState(
    `# NOW LOADING`
  );
  const appName = "snakeapi-demo-001";

  useEffect(() => {
    document.title = "Snake Brain Editor";

    fetch(`https://assignment-service.fly.dev/notebook/${appName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((notebook) => {
        // extract code cell sources and join them
        const combined = notebook.cells
          .filter((cell) => cell.cell_type === "code")
          .map((cell) => cell.source.join(""))
          .join("\n\n");
        setCode(combined);
      })
      .catch((err) => console.error("Failed to fetch notebook:", err));
  }, []);

  return (
    <main className="code-editor-page" style={{ paddingTop: "70px" }}>
      <div
        className="editor-page-layout"
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          fontFamily: "'Fira Code', 'Courier New', monospace",
        }}
      >
        {/* python editor */}
        <div
          className="box-panel"
          style={{
            flex: 2,
            background: "linear-gradient(145deg, #0d0221, #1a1a1a)",
            borderRadius: "12px",
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
        </div>

        {/* <div className="preview-section">
            <PreviewPanel code={code} />
        </div> */}


        {/* live arena */}
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

          <h4 style={{ color: "#fff", textAlign: "center", marginBottom: "1rem" }}>
            Battlesnake Preview
          </h4>

          {/* game url */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            <input
              type="text"
              placeholder="Game URL"
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                width: "100%",
                textAlign: "center",
                fontFamily: "'Fira Code', monospace",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: "#ff2a6d",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "20px",
                marginTop: "0.5rem",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              FETCH BOARD
            </button>
          </div>

          {/* test move button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
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
              TEST MOVE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageCodeEditor;
