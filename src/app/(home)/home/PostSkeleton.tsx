import { Skeleton } from "@nextui-org/react";

function PostSkeleton() {
  return (
    <div className="pt-4 dark:border-foreground-50 lg:pt-6">
      <div className="flex items-center gap-2 py-2 lg:gap-6">
        <div>
          <Skeleton className="h-20 w-20 rounded-md md:h-32 md:w-48 lg:h-40 xl:w-60" />
        </div>
        <div className="flex w-full flex-col justify-between gap-4">
          <span className="mt-1 flex items-center gap-2 text-xs">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </span>

          <div>
            <div className="mb-2 flex flex-col gap-2">
              <Skeleton className="h-4 w-full rounded-md lg:w-4/5" />
              <Skeleton className="h-4 w-full rounded-md lg:w-3/4" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full rounded-md lg:w-4/5" />
              <Skeleton className="h-4 w-full rounded-md max-sm:hidden lg:w-3/4" />
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
