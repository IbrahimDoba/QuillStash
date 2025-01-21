import Footer from '@/components/shared/Footer';
import Navigation from '@/components/shared/Navigation';
import Container from '@/components/Container';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation />
      <Container className='grid grid-rows-[auto_1fr_auto]  '>

      <main className='min-h-screen'>{children}</main>
      </Container>
      <Footer />
    </div>
  );
}
