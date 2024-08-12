import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect('/home');

  return <div className='min-h-screen'>{children}</div>;
}
