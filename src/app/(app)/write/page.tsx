
import React from 'react';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import PageContent from './page-content';

export const metadata: Metadata = {
  title: 'New post',
  description: 'Create a new post',
};

const Page = async () => {
  const session = await getSession();
  if (!session) redirect('/sign-in');

  return <PageContent />;
};

export default Page;
