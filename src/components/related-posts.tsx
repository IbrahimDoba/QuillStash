import { db } from "@/db";
import { Post, posts } from "@/db/schema";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { and, not, eq, sql } from "drizzle-orm";

async function RelatedPosts({ currentPost }: { currentPost: Post }) {
  const relatedPosts = await db.query.posts.findMany({
    where: and(
      not(eq(posts.id, currentPost.id)),
      // filter issues with json arrays currently will fix
      // for now we just exclude the current post
    ),
    limit: 4,
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    with: {
      author: {
        columns: {
          name: true,
          image: true,
          username: true,
        },
      },
    },
  });

  if (!relatedPosts.length) return null;

  return (
    <section className="max-sm:px-4">
      <h5 className="my-6 text-2xl font-bold">Continue reading</h5>
      <ul className="grid justify-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-x-16">
        {relatedPosts.map((post) => (
          <li key={post.id}>
            <div className="flex h-full flex-col gap-3">
              <div className="group relative h-full overflow-hidden rounded-md">
                <Image
                  alt={post.title}
                  width={300}
                  height={220}
                  src={post.coverImage ?? "/og-image.png"}
                  className="pointer-events-none aspect-video w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={post.author.image || undefined}
                      className="pointer-events-none h-6 w-6 text-tiny"
                      showFallback
                      name={post.author.name}
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <p>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  href={`/${post.author.username}/${post.slug}`}
                  className="desc"
                >
                  <h3 className="line-clamp-2 text-lg font-bold max-md:leading-6 lg:mb-2 lg:text-xl">
                    {post.title}
                  </h3>
                  <p className="line-clamp-1 text-sm text-foreground-600 md:line-clamp-2 md:text-base">
                    {post.summary}
                  </p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RelatedPosts;
