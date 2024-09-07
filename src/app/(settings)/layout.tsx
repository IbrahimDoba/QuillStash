import Container from '@/components/Container';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container>
        <main className='min-h-screen'>{children}</main>
      </Container>
    </>
  );
}