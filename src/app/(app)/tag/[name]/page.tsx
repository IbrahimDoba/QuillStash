import TagPostCard from '@/components/tag-post-card';
import { db } from '@/db';
import { Button } from '@nextui-org/react';
import { Frown } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;

  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: `Explore our collection of articles related to ${name}`,
  };
}

export const generateStaticParams = async () => {
  const tags = await db.query.tags.findMany();

  return tags.map((tag) => ({
    name: tag.name,
  }));
};

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;

  // Find the tag ID associated with the tag name
  const tag = await db.query.tags.findFirst({
    where: (tags, { eq }) => eq(tags.name, name),
  });

  if (!tag) {
    return (
      <div className='py-40 grid place-content-center'>
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

  return (
    <div>
      <section className='py-10 grid place-content-center'>
        <div className='max-w-prose text-center mt-10 space-y-3'>
          <h1 className='max-w-prose relative text-center text-balance text-2xl font-bold leading-10 tracking-tight md:text-3xl lg:text-4xl xl:text-5xl'>
            Showing results for articles tagged <span>&quot;{name}&quot;</span>
          </h1>
          <p>A curated collection of articles about {name}</p>
        </div>
      </section>
      <section className='py-6'>
        {posts.length ? (
          <ul className='grid grid-cols-[repeat(auto-fill,_minmax(16.75rem,_20rem))] gap-8 md:gap-14 max-md:justify-center'>
            {posts?.map((post) => (
              <li key={post.id} className='dark:border-foreground-50'>
                <TagPostCard {...post} />
              </li>
            ))}
          </ul>
        ) : (
          <TagNotFound />
        )}
      </section>
    </div>
  );
}

function TagNotFound() {
  return (
    <div className='grid place-content-center min-h-56'>
      <div className='space-y-2 flex items-center flex-col'>
        <Frown size={64} className='text-foreground-400' />
        <p className='max-w-prose text-center lg:px-10'>
          Sorry we couldn&apos;t find any articles on that topic. You can try
          exploring our other topics{' '}
          <Link
            href='/home'
            className='font-semibold underline underline-offset-2'
          >
            here
          </Link>{' '}
          or be the first to write on the topic you&apos;re looking for
        </p>
        <Button radius='sm' color='primary' href='/new' className='mt-8'>
          Don&apos;t be shy
        </Button>
      </div>
    </div>
  );
}
