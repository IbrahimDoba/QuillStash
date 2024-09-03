import { Skeleton, Card } from '@nextui-org/react';

function CommentSectionSkeleton() {
  const comments = Array.from({ length: 2 }).fill('');
  const replies = Array.from({ length: 1 }).fill('');

  return (
    <ul className='flex flex-col gap-6'>
      <li key={crypto.randomUUID()} className='grid gap-6'>
        <Card shadow='none' className='grid gap-4 p-6'>
          <div className='flex justify-between'>
            <div className='flex flex-row items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-4 w-10 rounded-full' />
              <Skeleton className='h-4 w-12' />
            </div>

            <Skeleton className='h-8 w-14 rounded-md' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </Card>

        <ul className='ml-10 flex flex-col gap-6 border-l-1.5 dark:border-l-foreground-100 pl-10'>
          {replies.map((_) => (
            <li key={crypto.randomUUID()}>
              <Card shadow='none' className='grid gap-4 p-6'>
                <div className='flex justify-between'>
                  <div className='flex flex-row items-center gap-3'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                    <Skeleton className='h-4 w-10 rounded-full' />
                    <Skeleton className='h-4 w-12' />
                  </div>

                  <Skeleton className='h-8 w-14 rounded-md' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-3/4' />
                  <Skeleton className='h-4 w-1/2' />
                  <Skeleton className='h-4 w-2/3' />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </li>

      {comments.map((_) => (
        <li key={crypto.randomUUID()}>
          <Card shadow='none' className='grid gap-4 p-6'>
            <div className='flex justify-between'>
              <div className='flex flex-row items-center gap-3'>
                <Skeleton className='h-8 w-8 rounded-full' />
                <Skeleton className='h-4 w-10 rounded-full' />
                <Skeleton className='h-4 w-12' />
              </div>

              <Skeleton className='h-8 w-14 rounded-md' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
              <Skeleton className='h-4 w-2/3' />
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default CommentSectionSkeleton;
