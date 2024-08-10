import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';
import ActionsDesktop from './Actions';

async function page({ post }: { post: Post }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(post.createdAt));

  return (
    <>
      <div className='relative w-fit mx-auto gap-x-8 lg:grid lg:grid-cols-[auto_1fr]'>
        <div className=' relative py-6 lg:py-10'>
          <ActionsDesktop title={post.title} />
        </div>
        <article className='py-6 lg:py-10 px-6 md:px-10 flex flex-col gap-5 max-w-screen-md'>
          <section className='space-y-4'>
            <time
              className='text-zinc-600 text-sm tracking-tight'
              dateTime={new Date(post.createdAt).toISOString()}
            >
              Published on {formattedDate}
            </time>
            <h1 className='font-bold text-2xl md:text-3xl lg:text-5xl leading-tight'>
              {post.title}
            </h1>
            <div className='rounded-full w-fit flex justify-center bg-red-200 text-red-600 px-4 py-1'>
              <p>{post.tags[0]}</p>
            </div>
            {post.userInfo.github ? (
              <Link
                href={post.userInfo.github}
                target='_blank'
                className='flex items-center gap-3 py-2 w-fit'
              >
                <Image
                  src={post.userInfo.image ?? '/profile.svg'}
                  alt={''}
                  width={42}
                  height={42}
                  className='w-6 h-6 lg:w-10 lg:h-10 rounded-full border'
                />
                <p className='text-sm lg:text-base font-medium'>
                  {post.userInfo.name}
                </p>
              </Link>
            ) : (
              <div className='flex items-center gap-3 py-2'>
                <Image
                  src={post.userInfo.image ?? '/profile.svg'}
                  alt={''}
                  width={42}
                  height={42}
                  className='w-6 h-6 lg:w-10 lg:h-10 rounded-full border'
                />
                <p className='text-sm lg:text-base font-medium'>
                  {post.userInfo.name}
                </p>
              </div>
            )}
          </section>

          <Image
            src={post.coverImage}
            alt={post.title}
            width={768}
            height={400}
            className='w-auto h-auto aspect-video rounded-lg'
          />
          <section
            className='prose prose-zinc prose-base lg:prose-lg xl:prose-xl mt-2 lg:mt-4'
            dangerouslySetInnerHTML={{
              __html: post.body ? post.body : '',
            }}
          />
        </article>
      </div>
      <section className='py-6 lg:py-10 px-6 md:px-10 max-w-screen-md mx-auto space-y-6'>
        {/* <ActionsMobile title={post.title} /> */}

        <div className='p-6 lg:p-10 flex flex-col items-center border border-input border-dashed rounded-xl max-w-screen-md mx-auto'>
          <div className='flex flex-col gap-6 lg:gap-8 text-center items-center'>
            <h3 className=' text-2xl lg:text-4xl font-bold'>Join us</h3>
            <p className=' max-w-prose md:text-lg lg:text-xl'>
              Join our community on discord
            </p>
            <Link
              href='https://github.com'
              target='_blank'
              className='w-fit flex gap-2 items-center rounded-md px-8 py-2.5 text-main bg-accent text-acceent transition duration-300 max-md:self-center'
            >
              Join
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
