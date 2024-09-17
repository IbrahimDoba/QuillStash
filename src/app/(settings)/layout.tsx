import Container from "@/components/Container";
import Footer from "@/components/shared/Footer";
import Navigation from "@/components/shared/Navigation";
import SideNav from "./sidenav";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:hidden">
        <Navigation />
      </div>
      <Container>
        <div className="relative min-h-screen lg:grid lg:grid-cols-[auto_1fr]">
          <SideNav />
          <main className="min-h-screen">{children}</main>
        </div>
      </Container>
      <Footer />
    </>
  );
}
