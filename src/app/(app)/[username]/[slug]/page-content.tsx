import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/db/schema';
import ActionsDesktop from './Actions';
import { Avatar } from '@nextui-org/react';

export interface PostContentProps extends Post {
  author: {
    username: string | null;
    image: string | null;
    name: string;
  } | null;
}

async function PostContent({ post }: { post: PostContentProps }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(post.createdAt));

  return (
    <>
      <div className='relative w-fit mx-auto gap-x-8 lg:grid lg:grid-cols-[auto_1fr]'>
        <div className=' relative py-6 lg:py-10'>
          {/* <ActionsDesktop title={post.title} /> */}
        </div>
        <article className='py-6 lg:py-10 px-6 md:px-10 flex flex-col gap-5 max-w-screen-lg'>
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
            <div className='flex items-center gap-3 flex-wrap'>
              {post?.tags?.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
            {post.author && (
              <Link
                href={`/${post.author.username}`}
                target='_blank'
                className='flex items-center gap-3 py-2 w-fit'
              >
                <Avatar
                  className='transition-transform'
                  color='secondary'
                  name={post.author.name ?? 'site user'}
                  size='sm'
                  src={
                    post.author.image ??
                    'https://i.pravatar.cc/150?u=a042581f4e29026704d'
                  }
                />
                <p className='text-sm lg:text-base font-medium'>
                  {post.author.name}
                </p>
              </Link>
            )}
          </section>

          <Image
            src={post.coverImage ?? '/login.jpg'}
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

        <div className='p-6 lg:p-10 flex flex-col items-center border dark:border-muted-foreground-50 border-dashed rounded-xl max-w-screen-md mx-auto'>
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

export default PostContent;
