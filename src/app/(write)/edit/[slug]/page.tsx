import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from './page-content';
import { db } from '@/db';

export const metadata: Metadata = {
  title: 'Edit Post',
};

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.slug, slug),
  });

  if (!post) {
    return notFound();
  }

  return <PageContent previousPostData={post} />;
}

export default Page;
