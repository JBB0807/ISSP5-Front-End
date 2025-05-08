import React from 'react';
import Editor from '@monaco-editor/react';

export default function EditorPanel({ code, onChange }) {
  return (
    <div style={{
      fontSize: '15px',
      border: '1px solid #444',
      borderRadius: '8px',
      backgroundColor: '#1e1e1e',
      height: '80%',
      boxShadow: '0 0 10px rgba(255, 0, 255, 0.2)',
      overflow: 'hidden'
    }}>
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={v => onChange(v || '')}
        theme="vs-dark"
        options={{
          fontSize: 20,
          padding: { top: 10, bottom: 10 },
          minimap: { enabled: false },
          scrollbar: {
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12
          },
          lineNumbers: 'on',
          scrollBeyondLastLine: false
        }}
      />
    </div>
  );
}
