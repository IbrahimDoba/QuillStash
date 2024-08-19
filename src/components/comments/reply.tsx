import { CommentReply } from '@/types';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import { PenLine, ReplyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface ReplyProps extends CommentReply {
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentUser: boolean;
}

function Reply({
  id,
  body,
  createdAt,
  updatedAt,
  user,
  isReplying,
  setIsReplying,
  isCurrentUser,
}: ReplyProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className='grid gap-6'>
      <Card className='grid gap-4 p-6'>
        <div className='flex flex-col justify-between gap-2 sm:flex-row'>
          <div className='flex flex-row items-center gap-3'>
            <Image
              width={30}
              height={30}
              src={user.image ?? '/user-1.png'}
              alt={`${user.name}'s profile picture`}
              className='rounded-full'
            />
            {isCurrentUser ? (
              <Chip variant={'faded'} className='w-fit'>
                You
              </Chip>
            ) : (
              <Link href={`/${user.username}`}>{user.name}</Link>
            )}
            <time className='text-sm text-muted-foreground'>
              {/* {dayjs(createdAt).fromNow()} */}
            </time>
            {createdAt !== updatedAt && (
              <p className='text-xs text-muted-foreground'>(edited)</p>
            )}
          </div>

          {isCurrentUser ? (
            <div className='flex gap-4'>
              {/* <ReplyDeleteConfirm id={id} /> */}
              <Button
                variant={'ghost'}
                size={'sm'}
                className='flex items-center gap-2 text-sm'
                onClick={() => setIsEditing(!isEditing)}
              >
                <PenLine size={16} />
                Edit
              </Button>
            </div>
          ) : (
            <Button
              variant={'ghost'}
              size={'sm'}
              className='flex items-center gap-2 text-sm'
              onClick={() => setIsReplying(!isReplying)}
            >
              <ReplyIcon size={16} />
              Reply
            </Button>
          )}
        </div>
        {!isEditing ? (
          <CardBody>{body}</CardBody>
        ) : (
          //   <EditReplyForm setIsOpen={setIsEditing} id={id} content={body} />
          <div>This should be an edit form</div>
        )}
      </Card>
    </li>
  );
}

export default Reply;
