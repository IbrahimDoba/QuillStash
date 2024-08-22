import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/db/schema";
import ActionsDesktop from "./Actions";
import { Avatar, Button, Chip, User } from "@nextui-org/react";
import Container from "@/components/Container";
import CommentSection from "@/components/comments/comment-section";
import getSession from "@/lib/getSession";

export interface PostContentProps extends Post {
  author: {
    username: string | null;
    image: string | null;
    name: string;
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
        <div className="relative py-6 lg:py-10">
          <ActionsDesktop
            title={post.title}
            userId={user?.id || ""}
            postId={post.id}
          />
        </div>
        {/* main content */}
        <div className="max-w-screen-md space-y-8 w-full">
          <article className="flex flex-col gap-5 lg:py-10">
            <section className="space-y-4">
              <time
                className="text-foreground-500 text-sm tracking-tight"
                dateTime={new Date(post.createdAt).toISOString()}
              >
                Published on {formattedDate}
              </time>
              <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl">
                {post.title}
              </h1>
              <ul className="flex gap-2 items-center flex-wrap">
                {post.tags.map((tag) => (
                  <Chip key={tag} size="sm">
                    {tag}
                  </Chip>
                ))}
              </ul>
              <User
                name={post.author?.name ?? "site user"}
                description="Product Designer"
                avatarProps={{
                  src:
                    post.author?.image ??
                    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                  size: "sm",
                }}
              />
            </section>
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                width={768}
                height={400}
                className="w-auto h-auto aspect-video rounded-lg"
              />
            )}
            <div
              className="prose mt-2 text-foreground xl:prose-lg lg:mt-4"
              dangerouslySetInnerHTML={{
                __html: post.body,
              }}
            />
          </article>
          <CommentSection id={post.id} user={user} />
        </div>

        {/* sidebar */}
        {/* <FeaturedPosts currentPost={slug} /> */}
        <aside className="top-[100px] h-fit w-fit rounded-md border bg-background p-6 shadow-sm max-lg:hidden lg:sticky">
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
        </aside>
      </section>

      <section className="py-6 lg:py-10 px-6 md:px-10 max-w-screen-md mx-auto space-y-6">
        {/* <ActionsMobile title={post.title} /> */}

        <div className="p-6 lg:p-10 flex flex-col items-center border dark:border-foreground-50 border-dashed rounded-xl max-w-screen-md mx-auto">
          <div className="flex flex-col gap-4 lg:gap-8 text-center items-center">
            <h3 className=" text-2xl lg:text-4xl font-bold">Buy this</h3>
            <p className=" max-w-prose md:text-lg lg:text-xl">
              More marketing stuff here
            </p>
            <Link
              href="https://github.com"
              target="_blank"
              className="w-fit flex gap-2 items-center rounded-md px-8 py-2.5 text-main bg-accent text-acceent transition duration-300 max-md:self-center"
            >
              Join
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default PostContent;
