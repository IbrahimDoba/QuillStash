import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import PageContent from './page-content';
import { db } from '@/db';

const getPost = cache(async (slug: string) => {
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.slug, slug),
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

  return post;
});

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    metadataBase: new URL('https://silver.vercel.app/'),
    title: post?.title,
    keywords: post?.tags || ['news'],
    openGraph: {
      type: 'article',
      url: `https://silver.vercel.app/${post?.author?.username}/${slug}`,
      title: post.title,
      siteName: 'Geotech4All',
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: [post?.author?.name || 'writer'],
      images: [
        {
          url: post.coverImage || 'https://silver.vercel.app/login.jpg' || '/login.jpg',
          width: '1200',
          height: '630',
          // alt: ''
        },
      ],
    },
  };
}

// generate all possible articles at compilation (SSG)

export const generateStaticParams = async () => {
  const posts = await db.query.posts.findMany({});
  return posts.map((post) => post.slug);
};

export const revalidate = 3600 * 12;

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post ||  !post.author) {
    return notFound();
  }

  return <PageContent post={post} />;
}

export default Page;
