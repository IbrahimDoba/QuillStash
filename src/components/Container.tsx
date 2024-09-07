import { twMerge } from 'tailwind-merge';

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge('container mx-auto px-6', className)}>{children}</div>
  );
}

export default Container;
