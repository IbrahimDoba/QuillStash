'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Code from '@tiptap/extension-code';
import Dropcursor from '@tiptap/extension-dropcursor';
import MenuBar from './MenuBar';

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
      }),
      Placeholder.configure({
        placeholder: 'Your story ...',
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: 'underline text-foreground' },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md',
        },
      }),
      Dropcursor.configure({
        color: 'blue',
      }),
      Underline,
      Highlight,
      Code,
    ],
    immediatelyRender: false, // This is important for SSR to avoid hydration errors
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      console.log(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          'prose text-foreground min-h-96 w-full min-w-full p-4 border dark:border-foreground-50 outline-none focus-visible:border-transparent focus-visible:ring-primary focus-visible:ring-2 rounded-md',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-col justify-stretch gap-2'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TextEditor;
