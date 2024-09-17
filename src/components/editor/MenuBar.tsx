import type { Editor } from '@tiptap/react';
import { Fragment } from 'react';

import MenuItem from './MenuItem';
import {
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Redo,
  SeparatorHorizontal,
  Undo,
  CodeSquare,
} from 'lucide-react';
import { Divider } from '@nextui-org/divider';
import ImageItem from './ImageItem';

export default function MenuBar({ editor }: { editor: Editor }) {
  const items = [
    {
      icon: Heading2,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: Heading3,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: Heading4,
      title: 'Heading 4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    {
      icon: List,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      type: 'divider',
    },
    {
      icon: Quote,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: SeparatorHorizontal,
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: Undo,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: Redo,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: CodeSquare,
      title: 'Code block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
  ];

  return (
    <div className='hidden sm:flex flex-wrap items-center gap-3 border py-2 px-3 dark:border-foreground-50 mx-4 rounded-md sticky top-[73px] bg-background z-50'>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? (
            <Divider orientation='vertical' />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
      <ImageItem editor={editor} />
    </div>
  );
}
