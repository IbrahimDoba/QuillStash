import Container from '@/components/Container';
import Footer from '@/components/shared/Footer';
import Navigation from '@/components/shared/Navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      <Navigation />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </Container>
  );
}
