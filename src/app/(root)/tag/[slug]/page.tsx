import Container from "@/components/Container";
import TagPostCard from "@/components/tag-post-card";
import { db } from "@/db";
import { Button } from "@nextui-org/react";
import { Frown, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const getTag = async (slug: string) => {
  const tag = await db.query.tags.findFirst({
    where: (tags, { eq }) => eq(tags.slug, slug),
  });
  return tag;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const tag = await getTag(slug);
  if (!tag) return {};

  return {
    title: tag.name,
    openGraph: {
      description: `Explore our collection of articles related to ${slug}`,
    },
  };
}

export const generateStaticParams = async () => {
  const tags = await db.query.tags.findMany();

  return tags.map((tag) => ({
    slug: tag.slug,
  }));
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Find the tag ID associated with the tag slug
  const tag = await getTag(slug);

  if (!tag) {
    return (
      <div className="grid place-content-center py-40">
        <TagNotFound />
      </div>
    );
  }

  // Find all post IDs associated with the tag ID
  const postTagRelations = await db.query.postToTags.findMany({
    where: (postToTags, { eq }) => eq(postToTags.tagId, tag.id),
  });

  const postIds = postTagRelations.map((relation) => relation.postId);

  // Step 3: Fetch all posts matching the post IDs
  const posts = await db.query.posts.findMany({
    where: (posts, { inArray }) => inArray(posts.id, postIds),
    with: {
      author: {
        columns: {
          username: true,
          image: true,
          name: true,
        },
      },
    },
  });

  const isQuillAI = tag.slug === "quillai";

  return (
    <Container>
      <section className="grid place-content-center py-10">
        <div className="mt-10 max-w-prose space-y-3 text-center">
          <h1 className="relative max-w-prose text-balance text-center text-2xl font-bold leading-10 tracking-tight md:text-3xl lg:text-4xl xl:text-5xl">
            {isQuillAI 
              ? "Discover QuillAI: Your Intelligent Writing Assistant"
              : `Articles Tagged "${tag.name}"`}
          </h1>
          <p className="text-lg text-foreground-600">
            {isQuillAI 
              ? "Explore articles about our AI-powered writing tool that helps you create better content faster"
              : `Dive into our handpicked collection of articles about ${tag.name}`}
          </p>
          {isQuillAI && (
            <div className="mt-6 rounded-lg bg-primary/5 p-4 center flex justify-around">
              <p className="flex items-center gap-2 text-primary">
                Try QuillAI now at{" "}
                <a 
                  href="https://ai.quillstash.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold hover:underline"
                >
                  ai.quillstash.com <ExternalLink size={16} />
                </a>
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="py-6">
        {posts.length ? (
         <ul className="grid grid-cols-4 gap-8 max-md:justify-center md:gap-14">
         {posts?.map((post) => (
           <li key={post.id} className="dark:border-foreground-50">
             <TagPostCard {...post} />
           </li>
         ))}
       </ul>
        ) : (
          <TagNotFound />
        )}
      </section>
    </Container>
  );
}

function TagNotFound() {
  return (
    <div className="grid min-h-56 place-content-center">
      <div className="flex flex-col items-center space-y-2">
        <Frown size={64} className="text-foreground-400" />
        <p className="max-w-prose text-center lg:px-10">
          We haven&apos;t published any articles on this topic yet. Browse our other topics{" "}
          <Link
            href="/home"
            className="font-semibold underline underline-offset-2"
          >
            here
          </Link>{" "}
          or share your knowledge by writing the first article.
        </p>
        <Button radius="sm" color="primary" href="/new" className="mt-8">
          Start Writing
        </Button>
      </div>
    </div>
  );
}