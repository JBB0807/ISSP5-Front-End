import React from 'react';
import Editor from '@monaco-editor/react';

export default function EditorPanel({ code, onChange }) {
  return (
    <div className="editor-panel">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={v => onChange(v || '')}
        theme="vs-dark"
      />
    </div>
  );
}