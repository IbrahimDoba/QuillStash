import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import PageContent from '../page-content';

// const getPost = cache(async (slug: string) => {
//   const post = await db.post.findFirst({})
//   return post;
// });
// above function isn't necessary if you're using fetch() as Next.js caches fetch reqs to the same url by default but since im using prisma it needs to be done manually

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const { slug } = params;
//   const post = await getPost(slug);

//   if (!post) return {};

//   return {
//     metadataBase: new URL('https://silver.vercel.app/'),
//     title: post?.title,
//     openGraph: {
//       type: 'article',
//       url: `https://silver.vercel.app/${username}/${slug}`,
//       title: post.title,
//       siteName: 'Geotech4All',
//       publishedTime: new Date(post.createdAt).toISOString(),
//       authors: [post.author.name || 'Geotech4All'],
//       images: [
//         {
//           url: post.image,
//           width: '1200',
//           height: '630',
//           // alt: ''
//         },
//       ],
//     },
//   };
// }

// generate all possible articles at compilation (SSG)
// export const generateStaticParams = async () => {
//   const posts = await db.post.findMany({
//     include: { author: true, category: true },
//   });
//   return posts.map((post) => post.slug);
// };

// export const revalidate = 3600 * 12;

async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  //   const post = await getPost(slug);

  //   if (!post) {
  //     return notFound();
  //   }

  //   return <PageContent post={post} />;
  return <div>empty for now</div>;
}

export default Page;
