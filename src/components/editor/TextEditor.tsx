"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Dropcursor from "@tiptap/extension-dropcursor";
import MenuBar from "./MenuBar";
import FloatingMenubar from "./FloatingMenuBar";

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from "lowlight";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

interface EditorProps {
  value: string;
  onChange: (html: string) => void;
}

function TextEditor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
        dropcursor: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Your story...",
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "underline text-foreground" },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "code-block",
        },
      }),
      Underline,
      Highlight,
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert text-foreground min-h-[30rem] w-full min-w-full p-4 outline-none focus-visible:ring-0",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col justify-stretch gap-2">
      <MenuBar editor={editor} />
      <FloatingMenubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TextEditor;
