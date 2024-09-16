import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import PageContent from './page-content';
import { db } from '@/db';
import { siteConfig } from '@/lib/site-config';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { highlightHtmlCodeBlocks } from '@/utils/highlight-code';
import { generateOgImageUrl } from '@/lib/verify-og';

const getPost = cache(async (slug: string) => {
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.slug, slug),
    with: { 
      author: {
        columns: {
          name: true,
          image: true,
          username: true,
          work: true
        },
      },
    },
  });
  if (!post) return null;

  try {
    post.body = await highlightHtmlCodeBlocks(post.body);
  } catch (error) {
    post.body = post.body;
  }
  

  // Increment the views count
  await db.update(posts)
    .set({
      views: post.views + 1,  // increment the views
    })
    .where(eq(posts.slug, slug));

  return post;
});

const getPostMetadata = cache(async (slug: string) => {
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.slug, slug),
    with: { 
      author: {
        columns: {
          name: true,
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
  const post = await getPostMetadata(slug);

  if (!post) return {};
  const ogImageUrl =  generateOgImageUrl({name:post.author.name, title:post.title, tag:post.tags?.[0]})
 
  return {
    metadataBase: new URL(siteConfig.url),
    title: post?.title,
    keywords: post?.tags,
    openGraph: {
      type: 'article',
      description: post.summary || siteConfig.description  ,
      url: `https://www.quillstash.com/${post?.author?.username}/${slug}`,
      title: post.title,
      siteName: siteConfig.title,
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: [post?.author?.name || siteConfig.title],
      images: [
        {
          url: ogImageUrl,
          width: '1200',
          height: '630',
          alt: post.title,
        },
      ],
    },
  };
}

export const generateStaticParams = async () => {
  const posts = await db.query.posts.findMany({
    with: { 
      author: {
        columns: {
          username: true,
        },
      },
    },
  });
  return posts.map((post) => ({
    username: post.author.username,
    slug: post.slug,
  }));
};

export const revalidate = 3600;

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post ||  !post.author) {
    return notFound();
  }

  return <PageContent post={post} />;
}

export default Page;
