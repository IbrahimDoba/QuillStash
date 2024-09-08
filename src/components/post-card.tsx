"use client"
import { Post } from '@/db/schema';
import { Card, CardBody, Image, Avatar, Button } from '@nextui-org/react';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { calculateReadTime } from '@/utils/caluclate-readtime';

interface PostProps extends Post {
  author: {
    name: string;
    image: string;
    username: string ;
  };
  likesCount: number;
  commentCount: number;
}

function PostCard({
  title,
  tags,
  coverImage,
  summary,
  createdAt,
  author,
  slug,
  likesCount,
  commentCount,
}: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      shadow='none'
      className='pt-4 lg:pt-6 rounded-none bg-transparent dark:border-foreground-50'
    >
      <CardBody className='max-md:px-0'>
        <div className='feedcard grid gap-y-2 gap-x-4 lg:gap-x-6 items-center'>
          <Link
            href={`${author.username}/${slug}`}
            className='img md:block overflow-hidden shrink-0'
          >
            <Image
              alt={title}
              width={220}
              radius='sm'
              src={coverImage ?? '/placeholder.jpg'}
              className='object-cover lg:rounded-md max-sm:h-[60px] max-sm:w-[80px] lg:min-h-[150px] aspect-video pointer-events-none'
            />
          </Link>
          {/* <div className=' flex-col gap-2 lg:gap-4 justify-between'> */}
            <span className='user flex items-center text-xs gap-2 lg:mt-1'>
              <Avatar
                src={author.image ?? '/user-1.jpg'}
                className='w-6 h-6 text-tiny pointer-events-none'
                showFallback
                name={author.name}
              />
              <span>{author.name}</span>
              on
              <time>
                {new Date(createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            </span>

            <Link href={`${author.username}/${slug}`} className='desc'>
              <h3 className='line-clamp-2 text-lg lg:text-xl lg:mb-2 font-bold max-md:leading-6'>{title}</h3>
              <p className='line-clamp-1 md:line-clamp-2 text-sm md:text-base text-foreground-600'>{summary}</p>
            </Link>

            <div className='info flex items-center gap-0.5'>
              <button
                className='text-default-900/60 data-[hover]:bg-foreground/10 flex gap-2 items-center rounded-full'
                onClick={() => setLiked((v) => !v)}
                title='Likes'
              >
                <Heart
                  className={liked ? '[&>path]:stroke-transparent' : ''}
                  fill={liked ? 'currentColor' : 'none'}
                  size={16}
                />
                <span className='text-default-900/60 text-xs'>{likesCount}</span>
              </button>
            </div>
          {/* </div> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default PostCard;
