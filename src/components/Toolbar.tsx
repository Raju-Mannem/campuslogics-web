"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Italic, List, Heading1, Heading2 } from "lucide-react";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `p-2 rounded hover:bg-gray-100 ${active ? "bg-blue-100 text-blue-600" : ""}`;

  return (
    <div className="flex gap-2 p-2 border rounded-md bg-white sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass(editor.isActive("heading", { level: 1 }))}
      >
        <Heading1 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass(editor.isActive("heading", { level: 2 }))}
      >
        <Heading2 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
      >
        <List size={18} />
      </button>

      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        Table
      </button>

      <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
        Add Column
      </button>

      <button onClick={() => editor.chain().focus().deleteTable().run()}>
        Delete Table
      </button>
    </div>
  );
}
