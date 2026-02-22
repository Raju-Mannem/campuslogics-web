'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';

import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import DOMPurify from 'dompurify'
import Toolbar from './Toolbar'


const Tiptap = ({ content, onChange }: { content: unknown, onChange: (html: unknown) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      // Text Styling
      Underline,
      Highlight,
      Subscript,
      Superscript,
      TextStyle,
      Color,

      // Alignment
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      // Links
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),

      // Images
      Image.configure({
        inline: true,
      }),

      // Lists
      TaskList,
      TaskItem.configure({
        nested: true,
      }),

      // Horizontal Rule
      HorizontalRule,

      // Blockquote
      Blockquote,

      // Code Block
      CodeBlockLowlight.configure({
        lowlight: createLowlight(),
      }),
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: content as any,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none border-2 p-4 rounded-md min-h-[200px]',
      },

      // for Word / Google Docs paste
      transformPastedHTML(html) {
        return DOMPurify.sanitize(html)
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  return (
    <div className="flex flex-col gap-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap