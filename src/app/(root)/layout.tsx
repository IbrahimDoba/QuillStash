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
      <main className=''>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

