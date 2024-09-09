import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Post } from "@/db/schema";
import PostActions from "./post-actions";
import { Chip, User } from "@nextui-org/react";
import CommentSection from "@/components/comments/comment-section";
import getSession from "@/lib/getSession";
import Promotion from "./promotion";
import React, { useEffect } from "react";

import DiscordCardComponent from "@/components/DiscordCard";
import Container from "@/components/Container";
import RenderHtml from "./render-html";
import Link from "next/link";

export interface PostContentProps extends Post {
  author: {
    username: string | null;
    image: string | null;
    name: string;
    work:string | null;
  } | null;
}

async function PostContent({ post }: { post: PostContentProps }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(post.createdAt));
  const session = await getSession();
  const user = session?.user;

  return (
    <Container>
      <section className="relative grid-rows-1 justify-center gap-x-8 lg:flex lg:grid-cols-[auto_1fr_auto]">
        {/* main content */}
        <div className="w-full max-w-4xl space-y-8">
          <article className="flex flex-col gap-5 py-6 lg:py-10">
            <section className="space-y-3">
              <div className="space-y-0.5">
                <time
                  className="text-sm tracking-tight text-foreground-500"
                  dateTime={new Date(post.createdAt).toISOString()}
                >
                  Published on {formattedDate}
                </time>
                <h1 className="text-2xl font-bold leading-8 tracking-wide md:text-3xl lg:text-5xl">
                  {post.title}
                </h1>
              </div>
              {/* <ul className="flex gap-2 items-center flex-wrap">
                {post.tags.map((tag) => (
                  <Chip key={tag} size="sm">
                    {tag}
                  </Chip>
                ))}
              </ul> */}
              <Link href={`/${post.author?.username}`}>
                <User
                  className="cursor-pointer my-2"
                  name={post.author?.name ?? "site user"}
                  description={post.author?.work}
                  avatarProps={{
                    src:
                      post.author?.image ??
                      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                    size: "sm",
                  }}
                />
              </Link>

              <div>
                <PostActions
                  title={post.title}
                  userId={user?.id || ""}
                  postId={post.id}
                  views={post.views}
                />
              </div>
            </section>
            {/* {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                width={768}
                height={400}
                className='w-auto h-auto aspect-video rounded-lg'
              />
            )} */}

            <RenderHtml html={post.body} />
          </article>
          <CommentSection id={post.id} user={user} />
        </div>

        {/* sidebar */}
        {/* <FeaturedPosts currentPost={slug} /> */}
        {/* <aside className="top-[100px] h-fit w-fit rounded-md border bg-background p-6 shadow-sm max-lg:hidden lg:sticky">
          <div className="w-fit">
            <p className="mb-4 text-center font-semibold lg:text-lg">
              Join the community
            </p>
            <Button radius="sm">
              <Link href="https://discord.gg" target="_blank">
                Join us
              </Link>
            </Button>
          </div>
        </aside> */}
      </section>

      <section className="mx-auto my-6 flex max-w-4xl items-center justify-center space-y-6 lg:my-10">
        {/* <Promotion /> */}
        <DiscordCardComponent />
      </section>
    </Container>
  );
}

export default PostContent;
