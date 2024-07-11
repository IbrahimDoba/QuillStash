import CreatePost from '@/components/blogs/createBlog'
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

const page = async ()  => {
  const session = await getServerSession(authOptions);

  
  if (!session) redirect("/auth/login");

  return (
    <div>
      <CreatePost/>
    </div>
  )
}

export default page
