import CreatePost from '@/components/blogs/createPost';
import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/auth/login');

  return <CreatePost />;
};

export default Page;
