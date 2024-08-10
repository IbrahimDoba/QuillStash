import { Post } from '@/types';
import { Card, CardBody, Image, Avatar, Button } from '@nextui-org/react';
import { Heart, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface PostProps extends Post {}

function PostCard({ title, tags, coverImage }: PostProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      shadow='none'
      className='pt-6 rounded-none bg-transparent dark:border-foreground-50'
    >
      <CardBody>
        <div className='flex gap-6 items-center'>
          <div className='shrink-0'>
            <Image
              alt='Card background'
              className='object-cover rounded-xl'
              src='https://nextui.org/images/hero-card-complete.jpeg'
              width={270}
            />
          </div>
          <div className='flex flex-col gap-4 justify-between'>
            <span className='flex items-center text-xs gap-2 mt-1'>
              <Avatar
                src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                className='w-6 h-6 text-tiny'
                showFallback
                name='Jason Hughes'
              />
              <span>Jason Hughes</span>
              on
              <time>Aug 12, 2024</time>
            </span>

            <div>
              <h3 className='line-clamp-2 text-xl mb-3'>
                Get Paid To Read Emails (1 Email = $3.00?) — Scam Or Legit?
              </h3>
              <p className='line-clamp-2 text-foreground-500'>
                So, we check our phones or computers and read emails every
                single day, but what if you could turn your daily inbox check
                into an…{' '}
              </p>
            </div>

            <div className='flex gap-3 items-center'>
              <Button
                isIconOnly
                className='text-default-900/60 data-[hover]:bg-foreground/10 flex gap-1 text-xs items-center'
                variant='light'
                onPress={() => setLiked((v) => !v)}
              >
                <Heart
                  className={liked ? '[&>path]:stroke-transparent' : ''}
                  fill={liked ? 'currentColor' : 'none'}
                  size={16}
                />
                <span className='text-default-900/60'>9</span>
              </Button>
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
