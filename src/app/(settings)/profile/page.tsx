import { notFound, redirect } from "next/navigation";
import PageContent from "./page-content";
import { db } from "@/db";
import getSession from "@/lib/getSession";
import { Metadata } from "next";
import { cache } from "react";
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

export const metadata: Metadata = {
  title: "Profile",
  openGraph: {
    description: "User profile",
  },
};

async function Page({ params }: { params: { username: string } }) {
  const { username } = params;
  const session = await getSession();
  const user = session?.user;

  const profileData = await getProfileData(username);

  if (!session) {
    redirect("sign-in");
  }
  
  if (!profileData) {
    return notFound();
  }

  return (
    <Container>
      <PageContent />
    </Container>
  );
}

export default Page;
