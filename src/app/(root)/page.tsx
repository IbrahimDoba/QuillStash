import Container from '@/components/Container';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  LockKeyhole,
  Palette,
  PenLine,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { Avatar, AvatarGroup, Link, Button } from '@nextui-org/react';
import getSession from '@/lib/getSession';


export default async function Home() {
  const session = await getSession();
  if (session) redirect('/home');

  return (
    <>
      <Container>
        <section className='grid place-items-center pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
          <div>
            <div className='relative mx-auto flex flex-col items-center text-center lg:items-start'>
              <div className='mt-4 md:mt-6 lg:mt-8 xl:mt-10'>
                <h1 className='relative text-balance text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl'>
                  Latest news, and insights from all over africa at your
                  fingertips
                </h1>
              </div>
              <p className='lg:text-lef mx-auto mt-8 max-w-prose text-foreground-500 text-balance text-center text-lg md:text-wrap lg:pr-10'>
                Discover the latest news, trends, and insights on the continent.
                Join our community and share your own insights by creating and
                writing blogs.
              </p>
            </div>
            <div className='mt-8 flex w-full items-center justify-center'>
              <Button
                size='md'
                href='/home'
                as={Link}
                radius='sm'
                color='primary'
                className='flex items-center gap-2 px-3 py-2 text-sm max-md:w-fit max-md:self-end'
              >
                <span>Explore stories</span>
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </section>
      </Container>

      {/* need to change the features content */}
      <section className=' bg-slate-50  dark:bg-transparent '>
        <Container className='space-y-6 py-8 md:py-12 lg:py-24'>
          <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
            <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
              Features
            </h2>
            <p className='max-w-[85%] leading-normal text-foreground-500 sm:text-lg sm:leading-7'>
              Silver is a project built with the latest technologies and tools.
              It is a full-featured blogging platform with a focus on the
              African continent.
            </p>
          </div>
          <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                <PenLine size={48} className='fill-current' />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Writing</h3>
                  <p className='text-sm text-foreground-500'>
                    Write, share your thoughts and findings.
                  </p>
                </div>
              </div>
            </div>
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                <Bot size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>AI</h3>
                  <p className='text-sm'>AI assisted something important.</p>
                </div>
              </div>
            </div>
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                <LockKeyhole size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Privacy</h3>
                  <p className='text-sm text-foreground-500'>
                    Your data is completely secure.
                  </p>
                </div>
              </div>
            </div>
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                <Palette size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Interface</h3>
                  <p className='text-sm text-foreground-500'>
                    Modern and intuitive user interface.
                  </p>
                </div>
              </div>
            </div>
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1'
                  className='h-12 w-12 fill-current'
                >
                  <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'></path>
                </svg>
                <div className='space-y-2'>
                  <h3 className='font-bold'>Authentication</h3>
                  <p className='text-sm text-foreground-500'>
                    Authentication using NextAuth.js.
                  </p>
                </div>
              </div>
            </div>
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[180px] flex-col justify-between rounded-md p-6'>
                <svg viewBox='0 0 24 24' className='h-12 w-12 fill-current'>
                  <path d='M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z' />
                </svg>
                <div className='space-y-2'>
                  <h3 className='font-bold'>Subscriptions</h3>
                  <p className='text-sm text-foreground-500'>
                    Silver is completely free to use.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='mx-auto text-center md:max-w-[58rem]'>
            <p className='leading-normal text-foreground-500 sm:text-lg sm:leading-7'>
              Silver also uses advanced AI models to optimize your content for
              search engine discoverability.
            </p>
          </div>
        </Container>
      </section>

      {/*  */}
      <section>
        <Container className='py-8 md:py-12 lg:py-24 space-y-6'>
          <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
            <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
              Proudly African
            </h2>
            <p className='max-w-[85%] leading-normal text-foreground-500 sm:text-lg sm:leading-7'>
              Silver is built and powered by developers from africa.
              <br /> You can join the community on{' '}
              <a
                href={'/'}
                target='_blank'
                rel='noreferrer'
                className='underline underline-offset-4'
              >
                Discord
              </a>
              .{' '}
            </p>
          </div>
          <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
            <AvatarGroup isBordered max={5} total={195}>
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
              <Avatar src='https://i.pravatar.cc/150?u=a04258a2462d826712d' />
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
              <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026302d' />
              <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
              <Avatar src='https://i.pravatar.cc/150?u=a04258114e29026708c' />
            </AvatarGroup>
            <p className='mb-4'>Join 200+ contributors today</p>
            <Button as={Link} href='/home' size='md' radius='sm' color='primary'>
              Get started
              <ArrowUpRight className='h-4 w-4' />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
