"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import PostSkeleton from "./PostSkeleton";
import { Post } from "@/db/schema";
import PostCard from "@/components/post-card";
import { Button } from "@nextui-org/react";
import { Unplug } from "lucide-react";
import Link from "next/link";

interface PostWithAuthor extends Post {
  author: {
    name: string;
    image: string;
    username: string;
  };
}

interface PostsApiResponse {
  posts: PostWithAuthor[];
  nextPage: number | null;
  totalPages: number;
  hasNextPage: boolean;
}

function PageContent() {
  const [limit] = useState(3);
  const { ref, inView } = useInView();
  const url = process.env.NEXT_PUBLIC_API_URL;

  const getPosts = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<PostsApiResponse> => {
    const res = await fetch(`${url}/posts?page=${pageParam}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
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
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-6 divide-y-1">
        {Array.from({ length: limit }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </ul>
    );
  }

  if (status === "error") {
    return (
      <div className="grid place-items-center gap-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <Unplug size={64} className="text-foreground-400" />
        <p className="max-w-prose text-center">
          An error occurred while connecting to our servers. Please check your
          connection and try again.
        </p>
        <Button onClick={() => refetch()} radius="sm">
          Retry
        </Button>
      </div>
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.posts);

  return (
    <>
      <ul className="flex flex-col divide-y-1 md:gap-4 lg:gap-6">
        {allPosts?.map((post) => (
          <li key={post.id} className="dark:border-foreground-100">
            <PostCard {...post} />
          </li>
        ))}
      </ul>

      <ul ref={ref} className="my-4 flex flex-col gap-6 divide-y-1">
        {isFetchingNextPage && (
          <>
            {Array.from({ length: limit }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </>
        )}
      </ul>

      {inView && !hasNextPage && (
        <div className="text-center text-sm text-foreground-500">
          <p>You somehow made it to the end yay!!!</p>
          <span>
            maybe checkout our{" "}
            <Link
              href="https://discord.gg/vkYvY4D3RA"
              className="font-medium underline underline-offset-2"
            >
              Discord?
            </Link>
          </span>
        </div>
      )}
    </>
  );
}

export default PageContent;
