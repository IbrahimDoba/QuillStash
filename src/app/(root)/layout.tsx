import Footer from '@/components/shared/Footer';
import Navigation from '@/components/shared/Navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
}
