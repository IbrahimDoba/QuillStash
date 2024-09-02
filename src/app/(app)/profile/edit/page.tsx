import ProfileForm from './profile-form';
import getSession from '@/lib/getSession';
import { users } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit your profile',
};

export default async function Page() {
  const session = await getSession();
  const email = session?.user.email!;
  const username = session?.user.username!;

  const profileData = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!profileData || !session) return redirect('sign-in');

  return <ProfileForm profileData={profileData} username={username} />;
}
