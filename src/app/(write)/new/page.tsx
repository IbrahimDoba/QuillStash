
import React from 'react';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import PageContent from './page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New article',
  description: 'Write a new post',
};

const Page = async () => {
  const session = await getSession();
  if (!session) redirect('/sign-in');

  return <PageContent />;
};

export default Page;
