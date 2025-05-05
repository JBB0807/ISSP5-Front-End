import React, { useState } from 'react';

export default function PreviewPanel({ code }) {
  const [gameUrl, setGameUrl] = useState('');
  const [settings, setSettings] = useState(null);
  const [loadingSetup, setLoadingSetup] = useState(false);

  const fetchBoard = async () => {
    if (!gameUrl.trim()) return;
    setLoadingSetup(true);
    try {
      const res = await fetch(
        `/api/fetch-board?url=${encodeURIComponent(gameUrl.trim())}`
      );
      if (!res.ok) throw new Error('Fetch board failed');
      setSettings(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSetup(false);
    }
  };

  const gameId = gameUrl.trim().split('/').pop();

  return (
    <div style={{
      flex: 1,
      background: '#1a1a1a',
      borderRadius: '12px',
      boxShadow: '0 0 15px #d300c5, 0 0 25px #ff2a6d',
      border: '1px solid #d300c5',
      padding: '1rem',
      color: '#eee',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#d300c5',
        height: '6px',
        borderRadius: '3px 3px 0 0',
        marginBottom: '0.5rem'
      }} />
      <h3 style={{
        fontSize: '1.2rem',
        margin: '0 0 1rem',
        color: '#d300c5',
        textShadow: '0 0 5px #d300c5',
        textAlign: 'center'
      }}>
        🎯 Live Arena Output
      </h3>

      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid #ff2a6d',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <input
          type="text"
          placeholder="Game URL"
          value={gameUrl}
          onChange={e => setGameUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '0.75rem',
            border: 'none',
            borderRadius: 4,
            background: 'transparent',
            color: '#fff',
            outline: 'none'
          }}
        />
        <button
          type="button"
          onClick={fetchBoard}
          disabled={!gameUrl.trim() || loadingSetup}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#ff2a6d',
            border: 'none',
            borderRadius: '20px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {loadingSetup ? 'Loading…' : 'FETCH BOARD'}
        </button>
      </div>

      {/* <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid #ff2a6d',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
      </div> */}

      <div style={{
        flex: 1,
        overflow: 'hidden',
        borderRadius: '8px'
      }}>
        {settings && gameId && (
          <iframe
            src={`/proxy/?game=${encodeURIComponent(gameId)}&autoplay=false&showControls=true`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Battlesnake Board"
          />
        )}
      </div>
    </div>
  );
}
