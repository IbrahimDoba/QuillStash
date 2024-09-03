import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import type { Editor } from '@tiptap/react';
import { Link } from 'lucide-react';
import { useState } from 'react';

function LinkItem({ editor }: { editor: Editor }) {
  // pull the previous url of the highlighted text from the editor
  const previousUrl = editor?.getAttributes('link').href;
  const [enteredUrl, setEnteredUrl] = useState(previousUrl);

  const addLink = (url: string) => {
    // if empty url is provided, unset the link
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    // if url is provided, set the link
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <>
      <Popover placement='bottom' showArrow offset={10} backdrop='opaque'>
        <PopoverTrigger>
          <Button
            className='p-1.5 rounded-md border-none'
            type='button'
            title='image'
            isIconOnly
            size='sm'
            radius='sm'
            variant={editor?.isActive('link') ? 'flat' : 'ghost'}
          >
            <Link size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[240px]'>
          {(titleProps) => (
            <div className='px-1 py-2 w-full'>
              <p
                className='text-small font-bold text-foreground'
                {...titleProps}
              >
                Set link
              </p>
              <div className='mt-2 flex gap-2 w-full'>
                <Input
                  defaultValue=''
                  value={enteredUrl}
                  onChange={(e) => setEnteredUrl(e.target.value)}
                  size='sm'
                  variant='bordered'
                  placeholder='https://example.com'
                />
                <Button
                  title='set link'
                  type='button'
                  size='sm'
                  radius='sm'
                  variant={editor?.isActive('link') ? 'flat' : 'ghost'}
                  isIconOnly
                  onClick={() => addLink(enteredUrl)}
                  className='border'
                >
                  <Link size={18} />
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default LinkItem;
