'use client';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import PostSkeleton from './_components/PostSkeleton';
import { Post } from '@/types';
import PostCard from './_components/PostCard';
import { Button } from '@nextui-org/button';
import { Unplug } from 'lucide-react';
import Link from 'next/link';

interface PostsApiResponse {
  posts: Post[];
  nextPage: number | null;
  totalPages: number;
  hasNextPage: boolean;
}

function PageContent() {
  const [limit] = useState(3);
  const { ref, inView } = useInView();

  const getPosts = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<PostsApiResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${pageParam}&limit=${limit}`
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: PostsApiResponse = await res.json();
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // useEffect(() => {
  //   console.log('Element is in view: ', inView);
  // }, [inView]);

  if (isLoading) {
    return (
      <ul className='flex flex-col gap-6 divide-y-1'>
        {Array.from({ length: limit }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (status === 'error') {
    return (
      <div className='grid place-items-center gap-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <Unplug size={64} className='text-foreground-400' />
        <p className='max-w-prose text-center'>
          An error occurred while connecting to our servers. Please check your
          connection and try again.
        </p>
        <Button onClick={() => refetch()} radius='sm'>
          Retry
        </Button>
      </div>
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.posts);

  return (
    <>
      <ul className='flex flex-col gap-6 divide-y-1'>
        {allPosts?.map((post) => (
          <li key={post._id} className='dark:border-foreground-50'>
            <PostCard {...post} />
          </li>
        ))}
      </ul>

      <ul ref={ref} className='flex flex-col my-4 gap-6 divide-y-1'>
        {isFetchingNextPage && (
          <>
            {Array.from({ length: limit }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </>
        )}
      </ul>

      {inView && !hasNextPage && (
        <div className='text-foreground-500 text-center text-sm'>
          <p>You somehow made it to the end yay!!!</p>
          <span>
            maybe checkout our <Link href='/' className='underline underline-offset-2 font-medium'>Discord?</Link>
          </span>
        </div>
      )}
    </>
  );
}

export default PageContent;
