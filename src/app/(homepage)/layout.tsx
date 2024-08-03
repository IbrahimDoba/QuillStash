import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  w-full  h-auto ">
      <Navbar />

      <div className="flex flex-col min-h-screen justify-start items-center mt-10 ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
