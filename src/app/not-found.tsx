import Container from '@/components/Container';
import { Discord } from '@/components/Icons';
import Search from '@/components/Search';
import { Button } from '@nextui-org/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <main>
        <Container className='flex-1'>
          <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                    Oops! Page Not Found
                  </h1>
                  <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                  </p>
                </div>
                <div className='w-full max-w-sm space-y-2'>
                  <Search />
                </div>
                <div className='w-full max-w-lg'>
                  <Image
                    alt='404 Illustration by popsy at popsy.co'
                    src='/404.svg'
                    height='500'
                    width='800'
                    className='aspect-square rounded-xl object-cover object-center'
                  />
                </div>
                <div className='space-y-4 '>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    If you&apos;re experiencing issues or something seems wrong,
                    let us know on our Discord server!
                  </p>
                  <Button radius='sm'>
                    <Link
                      target='_blank'
                      href='#'
                      className='flex items-center'
                    >
                      <Discord className='mr-2 h-4 w-4' />
                      Join our Discord
                    </Link>
                  </Button>
                </div>
                <Button radius='sm'>
                  <Link href='/' className='flex items-center gap-2'>
                    Go back home <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 stash. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link className='text-xs hover:underline underline-offset-4' href='/terms'>
            Terms of Service
          </Link>
          <Link className='text-xs hover:underline underline-offset-4' href='/privacy'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
