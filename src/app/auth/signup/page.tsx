import SignupForm from '@/components/auth/signupForm'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {

  const session = await getServerSession(authOptions);

  if (session) redirect("/home");



  return (
    <div>
      <SignupForm/>
    </div>
  )
}

export default page
