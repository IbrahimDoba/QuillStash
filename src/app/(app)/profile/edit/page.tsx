import ProfileForm from './profile-form';
import { ProfileData } from '../../[username]/page-content';
import { getServerSession } from 'next-auth';
import { db, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function Page() {

  const session = await getServerSession()
  const email = session?.user.email!

  const profileData = await db
  .select()
  .from(users)
  .where(eq(users.email , email))
  .limit(1)
  console.log("PROFILEDATA", profileData)
  if (profileData.length === 0) {
    redirect('/404'); // Redirect to a 404 page if user is not found
  }
 
  return <ProfileForm profileData={profileData[0]} />;
}
