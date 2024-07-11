import BlogList from "@/components/homeComponents/blogList";
import FeaturedBlogs from "@/components/homeComponents/featuredBlogs";
import RecommededUsers from "@/components/homeComponents/recommededUsers";
import TagsComponent from "@/components/homeComponents/tagsComponent";
import React from "react";

const HomePage = () => {
  return (
    <main className="min-w-[1380px]">
      <div className="flex  items-start  justify-center space-x-8 ">
        <TagsComponent />
        <FeaturedBlogs />
        <RecommededUsers />
      </div>
      {/* <div className="">
        <BlogList/>
      </div> */}
    </main>
  );
};

export default HomePage;
