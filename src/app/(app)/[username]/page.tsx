import { notFound } from "next/navigation";
import PageContent from "./page-content";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import getSession from "@/lib/getSession";
import { Metadata } from "next";

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
  // console.log(profileData);
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
    // metadataBase: new URL('https://silver.vercel.app/'),
    title: profile?.name,
    // keywords: post?.tags || ['news'],
    openGraph: {
      // type: 'article',
      url: `https://silver.vercel.app/${profile?.username}}`,
      title: profile.name,
      // siteName: 'Geotech4All',
      // publishedTime: new Date(post.createdAt).toISOString(),
      // authors: [post?.author?.name || 'writer'],
      images: [
        {
          url:
            profile.image ||
            "https://silver.vercel.app/login.jpg" ||
            "/login.jpg",
          width: "1200",
          height: "630",
          // alt: ''
        },
      ],
    },
  };
}

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
