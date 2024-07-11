import Image from "next/image";
import React from "react";
import img1 from "../../../public/Assets/bgimg1.jpg";
import BloglistCard from "../blogs/blogListCard";

const Home = () => {
  return (
    <div className=" min-w-[720px] ">
      <div className="text-xl w-[50%] items-start justify-around my-3 flex">
        <h2 className="cursor-pointer hover:underline">Latest</h2>
        <h2 className="cursor-pointer hover:underline">Top </h2>
      </div>
      {/* Featured Section */}
      <div className="flex flex-col justify-center items-center bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Featured Blogs</h2>
        <div className="">
          {/* Slider */}
          <div className="flex transition-transform duration-300 w-full">
            <div className="relative">
              <Image
                src={img1}
                alt="Featured Blog"
                width={500}
                height={200}
                className=" object-fill w-full rounded"
              />
              <div className="absolute z-30 bottom-4 text-white  p-6">
                <h3>Featured</h3>
                <h2 className="my-2 text-lg font-semibold">Blog Title 1</h2>
                <p className=" ">
                  Tesla batteries come with an eight year/150,000-mile warranty.
                  With these high repair costs come potentially high insurance
                  premiums. Some insurance companies may even classify Tesla as
                  luxury vehicles raising insurance premiums even more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 space-y-3">
        <BloglistCard />
    
      </div>
    </div>
  );
};

export default Home;
