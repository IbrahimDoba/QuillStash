import { CommentReply } from '@/types';
import { Avatar, Button, Card, CardBody, Chip } from '@nextui-org/react';
import { PenLine, ReplyIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface ReplyProps extends CommentReply {
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  isCurrentUser: boolean;
}

function Reply({
  commentId,
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
      <Card
        shadow='none'
        className='grid gap-2 p-4 border dark:border-foreground-50 rounded-md'
      >
        <div className='flex flex-col justify-between gap-2 sm:flex-row'>
          <div className='flex items-center gap-2'>
            <Avatar
              src={user.image ?? '/user-1.png'}
              name={`${user.name}`}
              size='sm'
            />
            {isCurrentUser ? (
              <Chip variant={'faded'} size='sm' className='w-fit'>
                You
              </Chip>
            ) : (
              <Link
                href={`/${user.username}`}
                target='_blank'
                className='text-sm hover:underline underline-offset-2'
              >
                {user.name}
              </Link>
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
                size={'sm'}
                className='flex items-center gap-2 text-sm'
                onClick={() => setIsEditing(!isEditing)}
                isIconOnly
              >
                <PenLine size={16} />
              </Button>
            </div>
          ) : (
            <Button
              size={'sm'}
              className='flex items-center gap-2 text-sm'
              isIconOnly
              onClick={() => setIsReplying(!isReplying)}
            >
              <ReplyIcon size={16} />
            </Button>
          )}
        </div>
        {!isEditing ? (
          <CardBody className='pl-11 py-0'>{body}</CardBody>
        ) : (
          //   <EditReplyForm setIsOpen={setIsEditing} id={id} content={body} />
          <div>This should be an edit form</div>
        )}
      </Card>
    </li>
  );
}

export default Reply;
