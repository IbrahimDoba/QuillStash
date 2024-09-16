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

  return (
    <Card shadow='sm'>
      <CardBody>
        <div className='flex flex-col gap-4'>
          <Link
            href={`/${author.username}/${slug}`}
            className='flex flex-col gap-2'
          >
            <Image
              alt={title}
              width={300}
              height={180}
              src={
                coverImage ??
                'https://nextui.org/images/hero-card-complete.jpeg'
              }
              className='object-cover rounded-lg aspect-square lg:aspect-video pointer-events-none '
            />
            <h3 className='line-clamp-2 font-semibold'>{title}</h3>
            <p className='text-sm line-clamp-2'>{summary}</p>
          </Link>
          {/* <div className='flex items-center justify-between'>
            <p className='text-xs'>2,000 views</p>
            <div className='flex items-center gap-0.5 text-xs'>
              <MessageSquare size={16}/>
              40
            </div>
          </div> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default TagPostCard;
