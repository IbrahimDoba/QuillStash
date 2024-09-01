import { Skeleton } from '@nextui-org/react';

function PostSkeleton() {
  return (
    <div className='pt-8 dark:border-foreground-50'>
      <div className='flex gap-6 items-center py-2'>
        <div>
          <Skeleton className='rounded-xl w-1/4 h-32 lg:w-[250px] lg:h-40' />
        </div>
        <div className='flex flex-col gap-4 justify-between w-full'>
          <span className='flex items-center text-xs gap-2 mt-1'>
            <Skeleton className='rounded-full size-5' />
            <Skeleton className='w-12 h-2.5 rounded-xl' />
            <Skeleton className='size-2 rounded-full' />
            <Skeleton className='w-14 h-2.5 rounded-xl' />
          </span>

          <div>
            <div className='flex flex-col gap-2 mb-4'>
              <Skeleton className='w-4/5 h-4 rounded-xl' />
              <Skeleton className='w-3/4 h-4 rounded-xl' />
            </div>

            <div className='flex flex-col gap-2'>
              <Skeleton className='w-4/5 h-3 rounded-xl' />
              <Skeleton className='w-3/4 h-3 rounded-xl' />
              <Skeleton className='w-2/4 h-3 rounded-xl' />
            </div>
          </div>

          <div className='flex gap-3 items-center'>
            <Skeleton className='size-6 rounded-xl' />
            <Skeleton className='size-6 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
