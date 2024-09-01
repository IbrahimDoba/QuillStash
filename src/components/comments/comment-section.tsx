'use client';
import { CommentWithAuthorAndReplyWithAuthor } from '@/types';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Fragment } from 'react';
import Comment from './comment';
import CommentForm from './comment-form';
import CommentSectionSkeleton from './comment-section-skeleton';

interface CommentSectionProps {
  id: string;
  user:
    | {
        id: string;
        name: string | null;
        email: string | null;
        image?: string | null;
        username: string | null;
      }
    | undefined;
}
function CommentSection({ id, user }: CommentSectionProps) {

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

  return (
    <section id='comments' className='space-y-10 border-y py-10'>
      <h1 className='text-2xl font-semibold'>Comments</h1>

      {user ? (
        <CommentForm userId={user?.id} postId={id} />
      ) : (
        <Button radius='sm'>
          <Link href='/sign-in'>Sign in to join the conversation</Link>
        </Button>
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
