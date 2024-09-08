import Container from "@/components/Container";
import Footer from "@/components/shared/Footer";
import Navigation from "@/components/shared/Navigation";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <Container>
        <main className="min-h-screen">{children}</main>
      </Container>
      <Footer />
    </>
  );
}
