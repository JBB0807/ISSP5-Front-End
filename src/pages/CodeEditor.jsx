import { useEffect, useState } from "react";
import EditorPanel from "../components/EditorPanel";
import SnakeSpinner from "../components/SnakeSpinner"; // 👈 make sure this file exists

const PageCodeEditor = () => {
  const [code, setCode] = useState(`# Write your Battlesnake code here\ndef move(board):\n    return { 'move': 'up' }`);
  const [isLoading, setIsLoading] = useState(false); // 👈 Spinner toggle

  useEffect(() => {
    document.title = "Snake Brain Editor";
  }, []);

  return (
    <main className="code-editor-page" style={{ paddingTop: '70px' }}>
      <div
        className="editor-page-layout"
        style={{
          display: 'flex',
          gap: '2rem',
          padding: '2rem',
          fontFamily: "'Fira Code', 'Courier New', monospace",
        }}
      >
        {/* Left: Snake Brain Editor */}
        <div
          className="box-panel"
          style={{
            flex: 2,
            background: 'linear-gradient(145deg, #0d0221, #1a1a1a)',
            borderRadius: '12px',
            boxShadow: '0 0 15px #05d9e8, 0 0 30px #ff2a6d',
            border: '1px solid #ff2a6d',
            padding: '1rem',
            color: '#eee',
          }}
        >
          <div
            style={{
              backgroundColor: '#ff2a6d',
              height: '6px',
              borderRadius: '3px 3px 0 0',
              marginBottom: '0.5rem',
            }}
          />
          <h3
            style={{
              fontSize: '1.2rem',
              color: '#05d9e8',
              textShadow: '0 0 5px #05d9e8',
              marginBottom: '1rem',
            }}
          >
            🐍 Snake Brain (Python)
          </h3>
          <EditorPanel code={code} onChange={setCode} />
        </div>

        {/* Right: Live Arena Output */}
        <div
          className="box-panel"
          style={{
            flex: 1,
            background: '#1a1a1a',
            borderRadius: '12px',
            boxShadow: '0 0 15px #d300c5, 0 0 25px #ff2a6d',
            border: '1px solid #d300c5',
            padding: '1rem',
            color: '#eee',
          }}
        >
          <div
            style={{
              backgroundColor: '#d300c5',
              height: '6px',
              borderRadius: '3px 3px 0 0',
              marginBottom: '0.5rem',
            }}
          />
          <h3
            style={{
              fontSize: '1.2rem',
              color: '#d300c5',
              textShadow: '0 0 5px #d300c5',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
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
};

export default PageCodeEditor;
