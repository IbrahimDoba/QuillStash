import Navbar from "@/components/shared/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  w-full  h-auto ">
      <Navbar />

      <div className="flex flex-col justify-center items-center mt-10 ">{children}</div>
    </div>
  );
};

export default Layout;
