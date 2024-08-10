'use client';
import { Button } from '@nextui-org/button';
import { Bookmark, Facebook, Heart, LinkIcon, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

function ActionsDesktop({ title }: { title: string }) {
  const baseUrl = 'https://productionurl.com';
  const pathname = usePathname();

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard', { position: 'top-right' });
  }

  const tweetText = encodeURIComponent(`${title}`);
  const pageUrl = encodeURIComponent(`${baseUrl}${pathname}`);

  return (
    <div className='w-fit lg:sticky top-0 hidden lg:flex flex-col gap-4 rounded-lg py-4'>
      <ul className='flex gap-6 flex-col'>
        <li>
          <Button isIconOnly>
            <Heart />
          </Button>
        </li>
        <li>
          <Button isIconOnly>
            <Bookmark />
          </Button>
        </li>
        <li>
          <Button isIconOnly>
            <Link
              href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${pageUrl}`}
              target='_blank'
              className='w-fit border border-input rounded-md p-2 grid place-content-center hover:text-red-400 hover:border-red-400 transition-all duration-300'
            >
              <Twitter className='w-6 h-6' />
            </Link>
          </Button>
        </li>
        <li>
          <Button isIconOnly>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
              target='_blank'
              className='w-fit border border-input rounded-md p-2 grid place-content-center hover:text-red-400 hover:border-red-400 transition-all duration-300'
            >
              <Facebook className='w-6 h-6' />
            </Link>
          </Button>
        </li>
        <li>
          <Button
            isIconOnly
            onClick={copyLink}
            className='border border-input rounded-md p-2 grid place-content-center hover:text-red-400 hover:border-red-400 transition-all duration-300'
          >
            <LinkIcon className='w-6 h-6' />
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default ActionsDesktop;
