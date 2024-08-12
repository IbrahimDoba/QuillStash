import CreatePost from '@/components/blogs/createPost';
import React from 'react';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getSession();

  if (!session) redirect('/auth/login');

  return <CreatePost />;
};

export default Page;
