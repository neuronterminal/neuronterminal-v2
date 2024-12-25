import React from 'react';
import Editor from '@monaco-editor/react';
import { useMonacoTheme } from '../hooks/useMonacoTheme';
import { defaultEditorOptions, editorLanguages } from '../config/editorOptions';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: keyof typeof editorLanguages;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  readOnly = false
}: CodeEditorProps) {
  useMonacoTheme();

  return (
    <div className="rounded-lg border border-[#00ff41] overflow-hidden">
      <Editor
        height="400px"
        language={editorLanguages[language]}
        value={value}
        onChange={onChange}
        theme="matrix"
        options={{
          ...defaultEditorOptions,
          readOnly
        }}
        loading={
          <div className="h-full w-full flex items-center justify-center text-[#00ff41]">
            Loading editor...
          </div>
        }
      />
    </div>
  );
}