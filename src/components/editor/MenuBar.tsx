import type { Editor } from '@tiptap/react';
import { Fragment } from 'react';

import MenuItem from './MenuItem';
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  PenLine,
  Quote,
  Redo,
  SeparatorHorizontal,
  Strikethrough,
  Undo,
} from 'lucide-react';
import { Divider } from '@nextui-org/divider';
import ImageItem from './ImageItem';
import LinkItem from './LinkItem';

export default function MenuBar({ editor }: { editor: Editor }) {
  const items = [
    {
      icon: Bold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: Italic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: Strikethrough,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: PenLine,
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: Heading3,
      title: 'Heading 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: Heading2,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
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
  ];

  return (
    <div className='flex flex-wrap items-center gap-3 border py-2 px-4 dark:border-foreground-50 rounded-md '>
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
      <LinkItem editor={editor} />
    </div>
  );
}
