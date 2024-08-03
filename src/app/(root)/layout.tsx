import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Providers from "@/context/QueryProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      
      <Navbar />
      <main className='flex justify-center items-center min-h-screen'>{children}</main>
      <Footer />
    </div>
  );
}

