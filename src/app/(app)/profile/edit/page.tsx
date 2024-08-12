import ProfileForm from './profile-form';
import getSession from '@/lib/getSession';
import { users } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';

export default async function Page() {
  const session = await getSession()
  const email = session?.user.email!

  const profileData = await db.query.users.findFirst({
    where: eq(users.email, email),
  });  

  if(!profileData) return redirect('sign-in');
 
  return <ProfileForm profileData={profileData} />;
}
