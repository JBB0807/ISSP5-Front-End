import React from 'react';
import Editor from '@monaco-editor/react';

export default function EditorPanel({ code, onChange }) {
  return (
    <div style={{
      border: '1px solid #444',
      borderRadius: '8px',
      backgroundColor: '#1e1e1e',
      height: '400px',
      boxShadow: '0 0 10px rgba(255, 0, 255, 0.2)',
      overflow: 'hidden',
    }}>
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={v => onChange(v || '')}
        theme="vs-dark"
        options={{
          fontSize: 16,
          padding: { top: 10, bottom: 10 },
          minimap: { enabled: false },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
