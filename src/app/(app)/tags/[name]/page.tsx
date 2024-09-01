import PostCard from '@/components/post-card';
import TagPostCard from '@/components/tag-post-card';
import { db } from '@/db';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { name } = params;

  return {
    title: name,
    description: `explore our collection of articles related to ${name}`,
  };
}

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = params;

  // Find the tag ID associated with the tag name
  const tag = await db.query.tags.findFirst({
    where: (tags, { eq }) => eq(tags.name, name),
  });

  if (!tag) {
    return <div>No posts found for this tag.</div>;
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
        <h1 className='max-w-prose relative text-center text-balance text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl xl:text-5xl'>
          Showing Posts that were tagged{' '}
          <span className='text-primary'>{name}</span>
        </h1>
      </section>
      <section className='py-6'>
        {posts.length ? (
          <ul className='grid grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] gap-8 md:gap-12 justify-center'>
            {posts?.map((post) => (
              <li key={post.id} className='dark:border-foreground-50'>
                <TagPostCard {...post} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </section>
    </div>
  );
}
