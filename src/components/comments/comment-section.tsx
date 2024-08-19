'use client';
import { commentSchema, CommentValues } from '@/lib/zod';
import { CommentWithAuthorAndReplyWithAuthor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Button, Card, Textarea } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Comment from './comment';
import CommentSectionSkeleton from './comment-section-skeleton';

interface CommentSectionProps {
  id: string;
  user:
    {
        id: string;
        name: string | null;
        email: string | null;
        image?: string | null;
        username: string | null;
      }
    | undefined;
}
function CommentSection({ id, user }: CommentSectionProps) {
  const [showInput, setShowInput] = useState(false);
  const queryClient = useQueryClient();

  const getComments = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`
    );
    const data: CommentWithAuthorAndReplyWithAuthor[] = await res.json();
    return data;
  };

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  const createComment = async (commentData: CommentValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...commentData,
      }),
    });
    if (!res.ok) {
      throw new Error('Failed to create comment');
    }
    return res.json();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      toast('Comment created successfully');
      setShowInput(false);
    },
    onError: (error) => {
      toast(`Failed to create comment: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: '',
      postId: id,
      userId: user?.id,
    },
  });

  const onSubmit = async (data: CommentValues) => {
    mutate(data);
  };

  return (
    <section id='comments' className='space-y-10 border-y py-10'>
      <h1 className='text-2xl font-semibold'>Comments</h1>

      {showInput ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className='flex flex-col gap-6 p-4'>
            <div>
              <label htmlFor='comment' className='sr-only'>
                Comment
              </label>
              <Textarea
                {...register('body')}
                id='comment'
                placeholder='join the conversation...'
              />
              {errors.body && (
                <p className='px-1 text-xs text-red-600'>
                  {errors.body.message}
                </p>
              )}
              <input hidden type="hidden" {...register('postId')} />
              <input hidden type="hidden" {...register('userId')} />
              {/* if any isues submiting comments remember these inputs */}
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex gap-4'>
                <Button onClick={() => setShowInput(!showInput)}>Close</Button>
                <Button
                  disabled={isPending}
                  isLoading={isPending}
                  color='primary'
                  type='submit'
                  className='flex w-fit items-center gap-2'
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
              <Avatar
                src={user?.image ?? '/user-1.png'}
                alt='profile picture'
                size='sm'
                name={user?.name ?? 'User'}
              />
            </div>
          </Card>
        </form>
      ) : (
        <>
          {user ? (
            <Button onClick={() => setShowInput(!showInput)} radius='sm'>
              Post comment
            </Button>
          ) : (
            <Button radius='sm'>
              <Link href='/sign-in'>Sign in to join the conversation</Link>
            </Button>
          )}
        </>
      )}

      <div>
        {isLoading ? (
          <CommentSectionSkeleton />
        ) : (
          <ul className='flex flex-col gap-6 px-4'>
            {comments?.map((comment) => (
              <Fragment key={comment.id}>
                <Comment {...comment} isCurrentUser={false} />
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default CommentSection;
