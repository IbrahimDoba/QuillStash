import Container from '@/components/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New article',
  description: 'Write a new post',
};

export default function RootLayout({
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
