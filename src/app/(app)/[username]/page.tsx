import { notFound } from 'next/navigation';
import PageContent from './page-content';
import { db } from '@/db';
import getSession from '@/lib/getSession';
import { Metadata } from 'next';
export const dynamicParams = true;
export const revalidate = 60;

const getProfileData = async (username: string) => {
  const profileData = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      posts: true,
      bookmarks: {
        with: {
          post: true,
        },
      },
      likes: {
        with: {
          post: true,
        },
      },
    },
  });
  return profileData;
};

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const { username } = params;
  const profile = await getProfileData(username);
  console.log(profile);
  if (!profile) return {};

  return {
    title: profile?.name,
    openGraph: {
      url: `https://silver.vercel.app/${profile?.username}}`,
      title: profile.name,
      images: [
        {
          url: profile.image || '/user-1.jpg',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const users = await db.query.users.findMany();
  return users.map((user) => ({ params: { username: user.username } }));
};

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const profileData = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      posts: {
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      },
      drafts: {
        orderBy: (drafts, { desc }) => [desc(drafts.createdAt)],
      },
      bookmarks: {
        orderBy: (bookmarks, { desc }) => [desc(bookmarks.createdAt)],
        with: {
          post: true,
        },
      },
      likes: {
        orderBy: (likes, { desc }) => [desc(likes.createdAt)],
        with: {
          post: true,
        },
      },
    },
  });
  console.log(profileData);
  const session = await getSession().catch(() => null);
    const user = session?.user;

  if (!profileData) {
    return notFound();
  }

  return (
    <PageContent
      {...profileData}
      isCurrentUser={user?.username === profileData.username}
    />
  );
}

