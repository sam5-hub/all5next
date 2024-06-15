'use client'
// InitializedMDXEditor.tsx
import type { ForwardedRef } from 'react'

import {
    AdmonitionDirectiveDescriptor,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  KitchenSinkToolbar,
  MDXEditorMethods,
  MDXEditorProps
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'


export default function CustomMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
    return (
        <MDXEditor
            plugins={[
                toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
                listsPlugin(),
                quotePlugin(),
                headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
                linkPlugin(),
                linkDialogPlugin(),
                imagePlugin({ imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'] }),
                tablePlugin(),
                thematicBreakPlugin(),
                frontmatterPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                codeMirrorPlugin({
                codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' },
                }),
                directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo'}),
                markdownShortcutPlugin()
            ]}

            {...props}
            ref={editorRef}
            className="p-4 my-10 w-[90vw] border rounded-md  bg-white border-color-gray-300 dark:border-color-gray-700"
        />
    )
}
