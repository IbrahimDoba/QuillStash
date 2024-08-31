
import React from 'react';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import PageContent from './page-content';

const Page = async () => {
  const session = await getSession();
  if (!session) redirect('/sign-in');

  return <PageContent />;
};

export default Page;
