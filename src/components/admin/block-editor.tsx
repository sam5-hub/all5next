"use client";

import { uploadFiles } from "@/utils/uploadthing";

import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

interface EditorProps {
  onChangeBlock: (content: String) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({
    onChangeBlock,
  initialContent,
  editable = true,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles("imageUploader", { files: [file] });
      return res.url;
    },
  });
  return (
    <div className="p-1">
      <BlockNoteView
        className="w-full"
        editor={editor}
        editable={editable}
        theme="dark"
        onChange={() => {
            onChangeBlock(JSON.stringify(editor.document, null, 2));
        }}

      />
    </div>
  );
};

export default Editor;