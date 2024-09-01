'use client';
import { Post } from '@/db/schema';
import { Card, CardBody, Image, Avatar, Button } from '@nextui-org/react';
import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PostProps extends Post {
  author: {
    name: string | null;
    image: string | null;
    username: string | null;
  };
}

function TagPostCard({
  title,
  coverImage,
  summary,
  createdAt,
  author,
  slug,
}: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card shadow='none'>
      <CardBody>
        <div className='flex flex-col gap-2 items-center'>
          <Link
            href={`${author.username}/${slug}`}
            className='flex flex-col gap-2'
          >
            <Image
              alt='post cover image'
              width={250}
              height={150}
              src={
                coverImage ??
                'https://nextui.org/images/hero-card-complete.jpeg'
              }
              className='object-cover rounded-lg aspect-square lg:aspect-video pointer-events-none '
            />
            <h3 className='line-clamp-2 font-semibold'>{title}</h3>
          </Link>
          <div className='flex justify-between'>
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
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TagPostCard;
