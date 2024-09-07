import { replySchema, ReplyValues } from '@/lib/zod';
import { CommentWithAuthorAndReplyWithAuthor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardBody,
  Chip,
  Textarea,
  Avatar,
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReplyIcon, PenLine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Reply from './reply';

interface CommentProps extends CommentWithAuthorAndReplyWithAuthor {
  isCurrentUser: boolean; // Existing logic for checking if this is the current user's comment
  isLoggedinUser: boolean; // New logic for checking if a user is logged in (but not the owner)
}

export default function Comment({
  createdAt,
  updatedAt,
  body,
  id,
  replies,
  user,
  isCurrentUser,
  isLoggedinUser,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ReplyValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      body: '',
      commentId: id,
      userId: user?.id,
    },
  });
  console.log(isCurrentUser, isLoggedinUser);
  const createReply = async (replyData: ReplyValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...replyData,
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to create reply');
    }
    return res.json();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      toast('Reply created successfully');
      setIsReplying(false);
    },
    onError: (error) => {
      toast(`Failed to create reply: ${error.message}`);
    },
  });

  const onSubmit = async (data: ReplyValues) => {
    mutate(data);
  };

  return (
    <li className='grid gap-4'>
      <Card
        shadow='none'
        className='grid gap-2 p-4 border dark:border-foreground-50 rounded-md'
      >
        <div className='flex flex-col justify-between gap-2 sm:flex-row'>
          <div className='flex items-center gap-2'>
            <Avatar
              src={user?.image ?? '/user-1.png'}
              name={`${user?.name}`}
              size='sm'
            />
            {isCurrentUser ? (
              <Chip variant={'flat'} size='sm' className='w-fit'>
                You
              </Chip>
            ) : (
              <Link
                href={`/${user?.username}`}
                target='_blank'
                className='text-sm hover:underline underline-offset-2'
              >
                {user?.name}
              </Link>
            )}
            <time className='text-sm text-muted-foreground'>
              {/* {dayjs(createdAt).fromNow()} */}
            </time>
            {createdAt !== updatedAt && (
              <p className='text-xs text-muted-foreground'>(edited)</p>
            )}
          </div>

          <div className='flex gap-4'>
          {/* Show Edit button only if the user owns the comment */}
            {/* {isCurrentUser && (
              <div className='flex gap-4'>
                <Button
                  size={'sm'}
                  className='flex items-center gap-2 text-sm'
                  isIconOnly
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <PenLine size={16} />
                </Button>
              </div>
            )} */}

            {/* Show Reply button for both owners and logged-in users */}
            {(isCurrentUser || isLoggedinUser) && (
              <Button
                size={'sm'}
                isIconOnly
                className='flex items-center gap-2 text-sm'
                onClick={() => setIsReplying(!isReplying)}
              >
                <ReplyIcon size={16} />
              </Button>
            )}
          </div>
        </div>

        {!isEditing ? (
          <CardBody className='pl-11 py-0'>{body}</CardBody>
        ) : (
          <div>this should be an edit form</div>
        )}
      </Card>

      <ul className='ml-4 flex flex-col gap-6 border-l-1.5 pl-4 lg:ml-6 lg:pl-6'>
        {isReplying && (
          <li>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className='flex flex-col gap-6 p-4'>
                <div>
                  <label htmlFor='reply' className='sr-only'>
                    Reply
                  </label>
                  <Textarea
                    {...register('body')}
                    id='reply'
                    placeholder='Your reply...'
                  />
                  {errors.body && (
                    <p className='px-1 text-xs text-red-600'>
                      {errors.body.message}
                    </p>
                  )}
                  <input hidden type='hidden' {...register('commentId')} />
                  <input hidden type='hidden' {...register('userId')} />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex gap-4'>
                    <Button
                      size={'sm'}
                      onClick={() => setIsReplying(!isReplying)}
                    >
                      Close
                    </Button>
                    <Button
                      disabled={isPending}
                      size={'sm'}
                      color='primary'
                      type='submit'
                      isLoading={isPending}
                      className='flex w-fit items-center gap-2'
                    >
                      {isSubmitting ? 'Replying...' : 'Reply'}
                    </Button>
                  </div>
                  <Image
                    width={35}
                    height={35}
                    src={user?.image ?? '/user-1.png'}
                    alt={'your profile picture'}
                    className='rounded-full'
                  />
                </div>
              </Card>
            </form>
          </li>
        )}

        {/* reply */}
        {replies?.map((reply) => (
          <Fragment key={reply.id}>
            <Reply
              {...reply}
              setIsReplying={setIsReplying}
              isReplying={isReplying}
              isCurrentUser={isCurrentUser}
              isLoggedinUser={isLoggedinUser}
            />
          </Fragment>
        ))}
      </ul>
    </li>
  );
}
