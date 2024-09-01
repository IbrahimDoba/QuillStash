"use client"
import { Post } from '@/db/schema';
import { Card, CardBody, Image, Avatar, Button } from '@nextui-org/react';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
interface PostProps extends Post {
  author: {
    name: string;
    image: string;
    username: string ;
  };
}

function PostCard({
  title,
  tags,
  coverImage,
  summary,
  createdAt,
  author,
  slug,
}: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      shadow='none'
      className='pt-6 rounded-none bg-transparent dark:border-foreground-50'
    >
      <CardBody>
        <div className='flex gap-4 lg:gap-6 items-center'>
          <Link
            href={`${author.username}/${slug}`}
            className='hidden md:block shrink-0 overflow-hidden'
          >
            <Image
              alt='post cover image'
              width={250}
              height={160}
              src={
                coverImage ??
                'https://nextui.org/images/hero-card-complete.jpeg'
              }
              className='object-cover rounded-lg aspect-square lg:aspect-video pointer-events-none '
            />
          </Link>
          <div className='flex flex-col gap-2 lg:gap-4 justify-between'>
            <span className='flex items-center text-xs gap-2 mt-1'>
              <Avatar
                src={author.image ?? '/user-1.jpg'}
                className='w-6 h-6 text-tiny pointer-events-none'
                showFallback
                name='Jason Hughes'
              />
              <span>{author.name ?? 'anonymous'}</span>
              on
              <time>
                {new Date(createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            </span>
            {/* <ul className="text-xs flex gap-4 justify-start">
              {tags?.map((tag, index) => (
                <li key={`${tag}-${index}`}>
                  <Link  href={`/tags/${tag}`}>
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul> */}
            <Link href={`${author.username}/${slug}`}>
              <h3 className='line-clamp-2 text-xl mb-2'>{title}</h3>
              <p className='line-clamp-2 text-foreground-500'>{summary}</p>
            </Link>

            <div className='flex gap-3 items-center'>
              <div className='flex items-center gap-0.5'>
                <Button
                  isIconOnly
                  className='text-default-900/60 data-[hover]:bg-foreground/10 flex gap-1 items-center rounded-full'
                  variant='light'
                  size='sm'
                  onPress={() => setLiked((v) => !v)}
                >
                  <Heart
                    className={liked ? '[&>path]:stroke-transparent' : ''}
                    fill={liked ? 'currentColor' : 'none'}
                    size={16}
                  />
                </Button>
                <span className='text-default-900/60 text-xs'>9</span>
              </div>
              <span className='flex gap-1'>
                <MessageSquare
                  className='text-default-900/60 stroke-transparent'
                  fill='currentColor'
                  size={16}
                />
                <span className='text-default-900/60 text-xs'>12</span>
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PostCard;
