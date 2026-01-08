"use client";

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MDEditorProps {
  value?: string;
  setValue: (v?: string) => void;
  height: number;
}
export function MarkdownEditor({ value, setValue, height }: MDEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={() => {
          setValue(value);
        }}
        height={height}
        preview="live"
      />
    </div>
  );
}
