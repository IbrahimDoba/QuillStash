import Footer from '@/components/shared/Footer';
import AlternateNavigation from '../../components/AlternateNavigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AlternateNavigation />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
}
