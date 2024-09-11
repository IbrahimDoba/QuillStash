import CommentSection from "@/components/comments/comment-section";
import { Post } from "@/db/schema";
import getSession from "@/lib/getSession";
import { User } from "@nextui-org/react";
import PostActions from "./post-actions";
import Container from "@/components/Container";
import DiscordCardComponent from "@/components/DiscordCard";
import RelatedPosts from "@/components/related-posts";
import Link from "next/link";
import RenderHtml from "./render-html";

export interface PostContentProps extends Post {
  author: {
    username: string | null;
    image: string | null;
    name: string;
    work: string | null;
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
        <div className="w-full max-w-4xl space-y-8">
          <article className="flex flex-col gap-5 py-6 lg:py-10">
            <div className="space-y-3">
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
              <Link href={`/${post.author?.username}`}>
                <User
                  className="my-2 cursor-pointer"
                  name={post.author?.name}
                  description={post.author?.work}
                  avatarProps={{
                    src: post.author?.image || undefined,
                    size: "sm",
                    showFallback: true,
                  }}
                />
              </Link>

              <PostActions
                title={post.title}
                userId={user?.id || ""}
                postId={post.id}
                views={post.views}
              />
            </div>
            <RenderHtml html={post.body} />
          </article>
        </div>

        {/* 
          <aside className="top-[100px] h-fit w-fit rounded-md border bg-background p-6 shadow-sm max-lg:hidden lg:sticky">
            <Toc />
          </aside>
        */}
      </section>

      <div className="mx-auto max-w-3xl">
        <CommentSection id={post.id} user={user} />
      </div>

      <div className="mx-auto max-w-3xl">
        <RelatedPosts currentPost={post} />
      </div>

      <section className="mx-auto my-6 flex max-w-4xl items-center justify-center space-y-6 lg:my-10">
        <DiscordCardComponent />
      </section>
    </Container>
  );
}

export default PostContent;
