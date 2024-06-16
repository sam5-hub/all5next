"use client";

import { Editor } from "novel";
import { useCallback, useState } from "react";
import type { Editor as TipTapEditor } from '@tiptap/core';
import { JSONContent } from '@tiptap/core';


interface EditorProps {
  onChangeBlock: (content?: JSONContent, htmlContent?: String) => void;
  initialContent?: string;
  editable?: boolean;
}

const NovelEditor = ({ initialContent, editable, onChangeBlock }: EditorProps) => {

  return (  
    <Editor
        className="editor bg-white text-gray-900 h-min-64 p-10"
        disableLocalStorage={true}
        defaultValue={JSON.parse(initialContent || '') || {
          "type": "doc",
          "content": []
        }}
        onDebouncedUpdate={(editor?: TipTapEditor) => {
          onChangeBlock(editor?.getJSON(), editor?.getHTML());
        }}>

        </Editor>
        )
};
export default NovelEditor;
