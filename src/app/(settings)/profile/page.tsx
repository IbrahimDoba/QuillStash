import { notFound } from "next/navigation";
import PageContent from "./page-content";
import { db } from "@/db";
import getSession from "@/lib/getSession";
import { Metadata } from "next";
import { cache } from "react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/Container";

const getProfileData = cache(async (username: string) => {
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
  return profileData;
});

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const { username } = params;
  const profile = await getProfileData(username);

  if (!profile) return {};

  return {
    title: profile?.name,
    description: profile?.bio ?? siteConfig.description,
    openGraph: {
      title: profile.name,
      description: profile.bio ?? siteConfig.description,
      url: `${siteConfig.url}/${profile?.username}}`,
      images: [
        {
          url: profile.image ?? siteConfig.ogImage,
        },
      ],
    },
  };
}

// export async function generateStaticParams() {
//   const users = await db.query.users.findMany();
//   return users.map((user) => ({ params: { username: user.username } }));
// }

// export const revalidate = 3600 * 12;

async function Page() {

  const session = await getSession();
  const user = session?.user;
  const username = user?.username
  const profileData = await getProfileData(username!);
  console.log(profileData)
  if (!profileData) {
    return notFound();
  }

  return (
    <Container>
      <PageContent
        {...profileData}
        isCurrentUser={user?.username === profileData.username}
      />

    </Container>
  );
}

export default Page;
