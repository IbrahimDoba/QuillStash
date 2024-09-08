import { Skeleton } from '@nextui-org/react';

function PostSkeleton() {
  return (
    <div className='pt-8 dark:border-foreground-50'>
      <div className='flex gap-2 lg:gap-6 items-center py-2'>
        <div>
          <Skeleton className='rounded-md w-20 h-20 md:h-32 lg:w-[250px] lg:h-40' />
        </div>
        <div className='flex flex-col gap-4 justify-between w-full'>
          <span className='flex items-center text-xs gap-2 mt-1'>
            <Skeleton className='rounded-full size-6' />
            <Skeleton className='w-12 h-4 rounded-md' />
            <Skeleton className='size-2 rounded-full' />
            <Skeleton className='w-14 h-4 rounded-md' />
          </span>

          <div>
            <div className='flex flex-col gap-2 mb-2'>
              <Skeleton className='w-full lg:w-4/5 h-4 rounded-md' />
              <Skeleton className='w-full lg:w-3/4 h-4 rounded-md' />
            </div>

            <div className='flex flex-col gap-2'>
              <Skeleton className='w-full lg:w-4/5 h-4 rounded-md' />
              <Skeleton className='w-full lg:w-3/4 max-sm:hidden h-4 rounded-md' />
              <Skeleton className='h-6 w-16 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
