import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
import { Button } from '@nextui-org/button';
import { AcmeLogo } from '@/components/Icons';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default async function LoginPage() {

  return (
    <div className='grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 px-6 lg:px-0'>
      <Button
        radius='sm'
        variant='ghost'
        className='absolute right-4 top-4 md:right-8 lg:hidden md:top-8 flex items-center gap-2'
      >
        <ArrowLeft className='h-4 w-4' />
        <Link href='/login'>Back</Link>
      </Button>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Welcome back
            </h1>
            <p className='text-sm text-foreground-500'>
              Enter your email and password to continue
            </p>
          </div>
          <AuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='hover:text-brand underline underline-offset-2'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className='hidden h-full bg-slate-100 dark:bg-slate-900 lg:grid place-content-center'>
        <AcmeLogo />
      </div>
    </div>
  );
}
