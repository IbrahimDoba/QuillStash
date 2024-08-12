import Container from '@/components/Container';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <Container className='grid grid-rows-[auto_1fr_auto]  '>
        <main className='min-h-screen'>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
