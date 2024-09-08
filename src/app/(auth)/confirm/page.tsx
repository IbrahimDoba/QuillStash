import { AudioWaveform, PenLine } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ConfirmForm } from './confirm-form';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import getSession from '@/lib/getSession';
import { SiteLogo } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Create account',
};

export default async function Confirm() {
  const session = await getSession();
  const user = session?.user;
  

  if (!user?.name || !user?.username) {
    return null;
  }

  return (
    <div className='grid min-h-screen w-full place-content-center p-4'>
      <div className='flex min-w-[300px] flex-col gap-8 rounded-md p-6 lg:w-[384px] lg:px-8 lg:py-10'>
        <div className='flex flex-col items-center gap-4 leading-3'>
          <div>
            <SiteLogo size={40} />
          </div>

          <div className='flex flex-col items-center'>
            <h1 className='text-lg font-semibold'>Set up your username</h1>
            <p className='text-sm text-muted-foreground'>
              Your username is your unique identity on the platform, please note
              that once this is set i cannot be changed.
            </p>
          </div>
        </div>

        <ConfirmForm
          name={user.name}
          username={user.username}
        />
      </div>
    </div>
  );
}
