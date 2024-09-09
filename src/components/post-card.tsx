"use client";
import { Post } from "@/db/schema";
import { Card, CardBody, Image, Avatar, Button } from "@nextui-org/react";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calculateReadTime } from "@/utils/caluclate-readtime";

interface PostProps extends Post {
  author: {
    name: string;
    image: string;
    username: string;
  };
  likesCount: number;
  commentCount: number;
}

function PostCard({
  title,
  tags,
  coverImage,
  summary,
  createdAt,
  author,
  slug,
  likesCount,
  body,
  commentCount,
}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [readingTime, setReadingTime] = useState<number>(0); // State to store reading time

  useEffect(() => {
    // Calculate the reading time when the component mounts
    const timeToRead = calculateReadTime(body); // Use the text body
    setReadingTime(timeToRead);
  }, [body]);
  return (
    <Card
      shadow="none"
      className="rounded-none bg-transparent pt-4 dark:border-foreground-50 lg:pt-6"
    >
      <CardBody className="max-md:px-0">
        <div className="feedcard grid items-center gap-x-4 gap-y-2 lg:gap-x-6">
          <Link
            href={`${author.username}/${slug}`}
            className="img shrink-0 overflow-hidden md:block"
          >
            <Image
              alt={title}
              width={220}
              radius="sm"
              src={coverImage ?? "/placeholder.jpg"}
              className="pointer-events-none aspect-video object-cover max-sm:h-[60px] max-sm:w-[80px] lg:min-h-[150px] lg:rounded-md"
            />
          </Link>
          <span className="user flex items-center gap-2 text-xs lg:mt-1 font-semibold">
            <Link href={`/${author.username}`}>
              {/* <div className=' flex-col gap-2 lg:gap-4 justify-between'> */}
              <Avatar
                src={author.image ?? "/user-1.jpg"}
                className="pointer-events-none h-6 w-6 text-tiny"
                showFallback
                name={author.name}
              />
            </Link>
            <Link href={`/${author.username}`}>
              <span>{author.name}</span>
            </Link>
            on
            <time>
              {new Date(createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </span>

          <Link href={`${author.username}/${slug}`} className="desc">
            <h3 className="line-clamp-2 text-lg font-bold max-md:leading-6 lg:mb-2 lg:text-xl">
              {title}
            </h3>
            <p className="line-clamp-1 text-sm text-foreground-600 md:line-clamp-2 md:text-base">
              {summary}
            </p>
          </Link>

          <div className="info items- flex gap-0.5 space-x-9">
            <button
              className="flex items-center gap-2 rounded-full text-default-900/60 data-[hover]:bg-foreground/10"
              onClick={() => setLiked((v) => !v)}
              title="Likes"
            >
              <Heart
                className={liked ? "[&>path]:stroke-transparent" : ""}
                fill={liked ? "currentColor" : "none"}
                size={16}
              />
              <span className="text-xs text-default-900/60">{likesCount}</span>
            </button>
            <div className="text-xs font-semibold text-foreground-600">
              {readingTime} min read
            </div>
          </div>
          {/* </div> */}
        </div>
      </CardBody>
    </Card>
  );
}

export default PostCard;
