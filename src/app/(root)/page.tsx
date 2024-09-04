import Container from '@/components/Container';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart,
  Bot,
  Compass,
  Layout,
  LockKeyhole,
  Palette,
  PenLine,
  Share2,
  Sparkles,
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
                  Write, Share, Discover
                </h1>
              </div>
              <p className='lg:text-lef mx-auto mt-8 max-w-prose text-foreground-500 text-balance text-center text-lg md:text-wrap lg:pr-10'>
                Join our vibrant community of writers and readers. Express your
                ideas, connect with like-minded individuals, and explore a world
                of diverse content.
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
              Unleash your creativity with our cutting-edge tools designed to
              elevate your writing experience.
            </p>
          </div>
          <div className='mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3'>
            {/*  */}
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[200px] flex-col justify-between rounded-md p-6'>
                <PenLine size={48} className='fill-current' />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Write</h3>
                  <p className='text-sm text-foreground-500'>
                    Express your thoughts, and craft compelling stories on our
                    user-friendly platform.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[200px] flex-col justify-between rounded-md p-6'>
                <Share2 size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Share</h3>
                  <p className='text-sm text-foreground-500'>
                    Reach and connect with readers who
                    appreciate your unique perspective.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[200px] flex-col justify-between rounded-md p-6'>
                <Compass size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Discover</h3>
                  <p className='text-sm text-foreground-500'>
                    Explore a vast array of topics and uncover new ideas.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[200px] flex-col justify-between rounded-md p-6'>
                <Layout size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>Intuitive Interface</h3>
                  <p className='text-sm text-foreground-500'>
                    Enjoy a clean, user-friendly interface that makes writing
                    and managing content a breeze.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[200px] flex-col justify-between rounded-md p-6'>
                <Sparkles size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>AI</h3>
                  <p className='text-sm'>
                    Enhance your writing with AI-powered suggestions, grammar
                    checks, and content optimization tools.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className='relative overflow-hidden rounded-lg border dark:border-foreground-50 bg-background p-2'>
              <div className='flex h-[200px] flex-col justify-between rounded-md p-6'>
                <BarChart size={48} />
                <div className='space-y-2'>
                  <h3 className='font-bold'>SEO Optimization</h3>
                  <p className='text-sm text-foreground-500'>
                    Boost content visibility with built-in SEO tools and
                    analytics to help your content rank higher.
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </Container>
      </section>

      {/*  */}
      <section>
        <Container className='py-8 md:py-12 lg:py-24 space-y-6'>
          <div className='mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center'>
            <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
              Vibrant Community
            </h2>
            <p className='max-w-[80%] leading-normal text-foreground-500 sm:text-lg sm:leading-7'>
              Connect with fellow writers, get inspired, and participate in
              engaging discussions on our Discord server.
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
            <p className='mb-4'>Join 200+ community members today</p>
            <Button
              as={Link}
              href={process.env.PERMANENT_DISCORD_LINK}
              size='md'
              radius='sm'
              color='primary'
            >
              Join community
              <ArrowUpRight className='h-4 w-4' />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
