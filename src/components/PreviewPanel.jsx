import React, { useState } from 'react';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function PreviewPanel({ code }) {
  const [gameId, setGameId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = uuidRegex.test(gameId);

  const handleClick = () => {
    if (isValid) {
      setSubmitted(true);
    }
  };

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
      boxSizing: 'border-box',
      height: '72vh',
      marginBorder : '1.5rem',
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
        padding: '0.2rem',
        marginBottom: '1.2rem'
      }}>
        <input
          type="text"
          placeholder="Game ID (UUID)"
          value={gameId}
          onChange={e => { setGameId(e.target.value.trim()); setSubmitted(false); }}
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '0.2rem',
            marginBottom: '0.5rem',
            border: 'none',
            borderRadius: 4,
            background: 'transparent',
            color: '#fff',
            outline: 'none',
          }}
        />
        {!isValid && gameId && (
          <p style={{ color: 'salmon', margin: '0 0 0.5rem' }}>
            Invalid Game ID format.
          </p>
        )}
        <button
          type="button"
          onClick={handleClick}
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: isValid ? '#ff2a6d' : '#555',
            border: 'none',
            borderRadius: '20px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }}
        >
          {submitted ? 'Loaded' : 'LOAD BOARD'}
        </button>
      </div>

      <div style={{
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '8px',
        height: '100vh',
      }}>
        {submitted && (
          <iframe
            src={`https://gameboard-service-aged-glitter-8141.fly.dev/?game=${encodeURIComponent(gameId)}&autoplay=false&showControls=true`}
            title="Battlesnake Board"
            style={{ width: '41vw', height: '85vh', border: 'none', paddingTop: '1rem', borderRadius: '8px' }}
            allowFullScreen
            scrolling="no"
          />
        )}
      </div>
    </div>
  );
}
