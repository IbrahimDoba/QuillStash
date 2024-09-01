'use client';
import {
  Bookmark,
  Copy,
  Heart,
  LinkIcon,
  MoreVertical,
  Share,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { siteConfig } from '@/lib/site-config';
import { X, Facebook } from '@/components/Icons';

function PostActions({
  postId,
  userId,
  title,
}: {
  postId: string;
  userId: string;
  title: string;
}) {
  const [likesCount, setLikesCount] = useState(0);
  const baseUrl = siteConfig.url;
  const pathname = usePathname();
  
  useEffect(() => {
    async function fetchLikesCount() {
      try {
        const response = await fetch(`/api/like?postId=${postId}`);
        if (response.ok) {
          const data = await response.json();
          setLikesCount(data.likesCount);
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching likes count:', error);
      }
    }

    fetchLikesCount();
    // eslint-disable-next-line
  }, []);

  async function handleLike() {
    if (!userId) {
      toast.error('Please sign in to like or bookmark a post.', {
        position: 'top-right',
      });
      return;
    }

    try {
      // console.log('IDS', postId, userId);
      // Call the API endpoint to handle the like action
      const response = await fetch(`/api/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId,
        }),
      });
      console.log(response);
      if (response.ok) {
        // Handle successful like action
        toast.success('Post liked!', { position: 'top-right' });
      } else {
        // Handle error
        toast.error('Failed to like post.', { position: 'top-right' });
      }
    } catch (error) {
      // Handle network error
      toast.error('An error occurred. Please try again later.', {
        position: 'top-right',
      });
    }
  }

  async function handleBookmark() {
    if (!userId) {
      toast.error('Please sign in to like or bookmark a post.', {
        position: 'top-right',
      });
      return;
    }

    try {
      // Call the API endpoint to handle the bookmark action
      const response = await fetch(`/api/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userId,
        }),
      });

      if (response.ok) {
        // Handle successful bookmark action
        toast.success('Post bookmarked!', { position: 'top-right' });
      } else {
        // Handle error
        toast.error('Failed to bookmark post.', { position: 'top-right' });
      }
    } catch (error) {
      // Handle network error
      toast.error('An error occurred. Please try again later.', {
        position: 'top-right',
      });
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard', { position: 'top-right' });
  }

  const tweetText = encodeURIComponent(`${title}`);
  const pageUrl = encodeURIComponent(`${baseUrl}${pathname}`);
  // https://api.whatsapp.com/send/?text=${pageurl}&type=custom_url&app_absent=0

  return (
    <div className='w-full py-2 flex justify-between border-y dark:border-y-foreground-50'>
      <ul className='flex gap-6 '>
        <li className='flex gap-1 items-center '>
          <Button
            variant='light'
            isIconOnly
            className='rounded-full'
            size='sm'
            onClick={handleLike}
          >
            <Heart className="size-4" />
          </Button>
          <span className='text-xs'>{likesCount}</span>
        </li>
        <li>
          <Button
            variant='light'
            isIconOnly
            className='rounded-full'
            size='sm'
            onClick={handleBookmark}
          >
            <Bookmark className="size-4" />
          </Button>
        </li>
      </ul>

      <div>
        <Dropdown radius='sm'>
          <DropdownTrigger>
            <Button
              isIconOnly
              className='rounded-full'
              size='sm'
              variant='light'
            >
              <MoreVertical className='size-4' />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Actions'>
            <DropdownItem
              href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${pageUrl}`}
              target='_blank'
              startContent={<X className='size-4'/>}
            >
              <span>Share on Twitter</span>
            </DropdownItem>
            <DropdownItem
              href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
              target='_blank'
              startContent={<Facebook className='size-4' />}
            >
              <span>Share on Facebook</span>
            </DropdownItem>
            <DropdownItem
              onClick={copyLink}
              startContent={<Copy className="size-4" />}
            >
              <span>Copy post link</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default PostActions;
