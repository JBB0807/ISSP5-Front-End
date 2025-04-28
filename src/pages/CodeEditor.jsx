// Page - Code Editor
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import EditorPanel from "../components/EditorPanel";
import PreviewPanel from "../components/PreviewPanel";

const PageCodeEditor = () => {

  const [code, setCode] = useState(`# Write your Battlesnake code here\ndef move(board):\n    return { 'move': 'up' }`);

  // State for storing code in different tabs
  const [htmlCode, setHtmlCode] = useState(
    "<div>\n  <h1>Hello World</h1>\n  <p>Start editing to see some magic happen!</p>\n</div>"
  );
  const [cssCode, setCssCode] = useState(
    "h1 {\n  color: #0070f3;\n}\n\np {\n  color: #444;\n}"
  );
  const [jsCode, setJsCode] = useState(
    '// JavaScript goes here\nconsole.log("Hello from the editor!");'
  );

  // State for active tab
  const [activeTab, setActiveTab] = useState("html");

  // Combined code for preview
  const combinedCode = `
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
            </body>
        </html>
    `;

  useEffect(() => {
    document.title = "Code Editor";
  }, []);

  // Function to handle which editor to show based on active tab
  const renderEditor = () => {
    switch (activeTab) {
      case "html":
        return (
          <CodeMirror
            value={htmlCode}
            height="100%"
            theme={vscodeDark}
            extensions={[html()]}
            onChange={(value) => setHtmlCode(value)}
          />
        );
      case "css":
        return (
          <CodeMirror
            value={cssCode}
            height="100%"
            theme={vscodeDark}
            extensions={[css()]}
            onChange={(value) => setCssCode(value)}
          />
        );
      case "js":
        return (
          <CodeMirror
            value={jsCode}
            height="100%"
            theme={vscodeDark}
            extensions={[javascript()]}
            onChange={(value) => setJsCode(value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="code-editor-page">

      <div className="editor-section">
          <EditorPanel code={code} onChange={setCode} />
      </div>
      <div className="preview-section">
          <PreviewPanel code={code} />
      </div>

      <div className="editor-container">
        <div className="editor-tabs">
          <button
            className={`tab ${activeTab === "html" ? "active" : ""}`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`tab ${activeTab === "css" ? "active" : ""}`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          <button
            className={`tab ${activeTab === "js" ? "active" : ""}`}
            onClick={() => setActiveTab("js")}
          >
            JavaScript
          </button>
        </div>
        <div className="editor-content">{renderEditor()}</div>
      </div>
      <div className="preview-container">
        <div className="preview-header">
          <h3>Preview</h3>
        </div>
        <div className="preview-content">
          <iframe
            title="code-preview"
            srcDoc={combinedCode}
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </main>
  );
};

export default PageCodeEditor;
