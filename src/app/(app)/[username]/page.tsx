import { notFound } from 'next/navigation';
import PageContent from './page-content';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import getSession from '@/lib/getSession';

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const profileData = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  const session = await getSession();
  const user = session?.user;

  if (!profileData) {
    return notFound();
  }

  return <PageContent {...profileData} isCurrentUser={user?.email === profileData.email}/>;
}
