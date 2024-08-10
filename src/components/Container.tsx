function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container mx-auto px-6 ${className}`}>{children}</div>
  );
}

export default Container;
