import { notFound } from 'next/navigation';
import PageContent from './page-content';
import { db } from '@/db';
import getSession from '@/lib/getSession';
import { Metadata } from 'next';

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

export const generateStaticParams = async () => {
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
  console.log(profileData);
  const session = await getSession();
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
