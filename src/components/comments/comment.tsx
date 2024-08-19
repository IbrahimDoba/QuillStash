import { commentSchema, CommentValues } from '@/lib/zod';
import { CommentWithAuthorAndReplyWithAuthor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, Chip, Textarea } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PenLine, ReplyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Reply from './reply';


interface CommentProps extends CommentWithAuthorAndReplyWithAuthor {
  isCurrentUser: boolean;
}

export default function Comment({
  createdAt,
  updatedAt,
  body,
  id,
  replies,
  user,
  isCurrentUser,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const queryClient = useQueryClient();

  // const session = useSession();
  // const user = session.data?.user;
  // console.log(user?.id);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
  });

  const createReply = async (replyData: CommentValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...replyData,
        commentId: id,
        userId: user?.id, 
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to create comment');
    }
    return res.json();
  };

  const mutation = useMutation({
    mutationFn: createReply,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      toast('Comment created successfully');
      setIsReplying(false);
    },
    onError: (error) => {
      toast(`Failed to create comment: ${error.message}`);
    },
  });

  const onSubmit = async (data: CommentValues) => {
    mutation.mutate(data);
  };

  return (
    <li className='grid gap-6'>
      <Card className='grid gap-4 p-6'>
        <div className='flex flex-col justify-between gap-2 sm:flex-row'>
          <div className='flex flex-row items-center gap-3'>
            <Image
              width={30}
              height={30}
              src={user?.image ?? '/user-1.png'}
              alt={`${user?.name}'s profile picture`}
              className='rounded-full'
            />
            {isCurrentUser ? (
              <Chip variant={'flat'} className='w-fit'>
                You
              </Chip>
            ) : (
              <Link href={`/${user?.username}`}>{user?.name}</Link>
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
              {/* <CommentDeleteConfirm id={id} /> */}
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
         //  <EditCommentForm setIsOpen={setIsEditing} id={id} content={body} />
         <div>this should be an edit form</div>
        )}
      </Card>

      <ul className='ml-4 flex flex-col gap-6 border-l-2 pl-4 lg:ml-10 lg:pl-10'>
        {isReplying && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='flex flex-col gap-6 p-4'>
              <div>
                <label htmlFor='comment' className='sr-only'>
                  Comment
                </label>
                <Textarea
                  {...register('body')}
                  id='comment'
                  placeholder='Your reply...'
                />
                {errors.body && (
                  <p className='px-1 text-xs text-red-600'>
                    {errors.body.message}
                  </p>
                )}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex gap-4'>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    onClick={() => setIsReplying(!isReplying)}
                  >
                    Close
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    size={'sm'}
                    isLoading={isSubmitting}
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
        )}

        {/* reply */}
        {replies?.map((reply) => (
          <Fragment key={reply.id}>
            <Reply
              {...reply}
              setIsReplying={setIsReplying}
              isReplying={isReplying}
              isCurrentUser={false}
            />
          </Fragment>
        ))}
      </ul>
    </li>
  );
}
