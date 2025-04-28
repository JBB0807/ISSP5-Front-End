import React, { useState } from 'react';

export default function PreviewPanel({ code }) {
  const [gameUrl, setGameUrl] = useState('');
  const [snakeApiUrl, setSnakeApiUrl] = useState('');
  const [settings, setSettings] = useState(null);
  const [moveRes, setMoveRes] = useState(null);
  const [loadingSetup, setLoadingSetup] = useState(false);
  const [loadingMove, setLoadingMove] = useState(false);


    const fetchSetup = async (e) => {
      e.preventDefault();
      setLoadingSetup(true);
      try {
        const res = await fetch(
          `/api/fetch-board?url=${encodeURIComponent(gameUrl.trim())}`
        );
        setSettings(await res.json());
        setMoveRes(null);
      } catch (err) {
        console.error(err);
      }
      setLoadingSetup(false);
    };

  const testMove = async (e) => {
    e.preventDefault();
    if (!settings) return;
    setLoadingMove(true);
    try {
      const res = await fetch('/api/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, boardState: settings })
      });
      setMoveRes(await res.json());
    } catch (err) {
      console.error(err);
    }
    setLoadingMove(false);
  };

  const gameId = gameUrl.trim().split('/').pop();

  return (
    <div
      className="preview-panel"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <h2>Battlesnake Preview</h2>

      {/* game board URL */}
      <form style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Game URL"
          value={gameUrl}
          onChange={(e) => setGameUrl(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={fetchSetup} disabled={!gameUrl || loadingSetup}>
          {loadingSetup ? 'Loading…' : 'Fetch Board'}
        </button>
      </form>

      {/* API server URL */}
      <form style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Your Snake API URL"
          value={snakeApiUrl}
          onChange={(e) => setSnakeApiUrl(e.target.value)}
          style={{ flex: 1 }}
        />
        <button onClick={fetchSetup} disabled={!snakeApiUrl || loadingSetup}>
          {loadingSetup ? 'Loading…' : 'Connect Snake API'}
        </button>
      </form>

      {/* Test Move */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={testMove} disabled={!settings || loadingMove}>
          {loadingMove ? 'Testing…' : 'Test Move'}
        </button>
      </div>

      {settings && gameId && (
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <iframe
            src={`/proxy/?game=${gameId}&autoplay=false&showControls=true`}
            style={{ width: '70%', height: '100%', border: 'none' }}
            title="Battlesnake Board"
          />

          {/*<iframe
            src={`/board/index.html?game=${gameId}&autoplay=true&showControls=true`}
            style={{ width: '70%', height: '100%', border: 'none' }}
            title="Battlesnake Board"
          />*/}

          <div
            style={{
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              background: '#222',
              color: '#eee',
              padding: '1rem'
            }}
          >
            {moveRes && (
              <pre
                style={{
                  background: moveRes.error ? '#500' : '#050',
                  color: '#fff',
                  padding: '0.5rem',
                  marginBottom: '1rem',
                  overflowX: 'auto'
                }}
              >
                {JSON.stringify(moveRes, null, 2)}
              </pre>
            )}
            <pre
              style={{
                flex: 1,
                margin: 0,
                padding: '0.5rem',
                overflow: 'auto'
              }}
            >
              {JSON.stringify(settings, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
