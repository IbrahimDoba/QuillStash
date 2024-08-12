import { redirect } from 'next/navigation';
import Profile from './page-content';
import { getSession } from 'next-auth/react';
import { PostAuthor } from '@/types';
import { connectDb } from '@/lib/ConnetctDB';
import User from '@/models/User';
import PageContent from './page-content';
import { db, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const profileData = await db
  .select()
  .from(users)
  .where(eq(users.username , username))
  .limit(1)
  console.log(profileData)
  if (profileData.length === 0) {
    redirect('/404'); // Redirect to a 404 page if user is not found
  }
 
  return <PageContent {...profileData[0]} />;
}

// const profileData = {
//   _id: '1', 
//   name: 'John Doe',
//   username: 'johndoe',
//   bio: 'This is a bio',
//   location: 'Somewhere',
//   pronouns: 'He/Him',
//   work: 'Software Engineer',
//   email: '',
//   image: 'https://source.unsplash.com/random',
//   createdAt: new Date(),
//   github: '',
//   posts: [
//     {
//       title: 'Post 1',
//       slug: 'post-1',
//       coverImage: 'https://source.unsplash.com/random',
//       createdAt: new Date(),
//     },
//   ],
// };
