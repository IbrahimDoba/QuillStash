// import BlogList from "@/components/homeComponents/blogList";
import PostsComponent from "@/components/homeComponents/postsComponent";
import BlogsComponent from "@/components/homeComponents/postsComponent";
import FeaturedBlogs from "@/components/homeComponents/postsComponent";
import RecommededUsers from "@/components/homeComponents/recommededUsers";
import TagsComponent from "@/components/homeComponents/tagsComponent";
import React from "react";

const HomePage = () => {
  return (
    <main className="min-w-[1380px]">
      <div className="flex  items-start  justify-center space-x-8 ">
        <PostsComponent />
        <div className="flex flex-col space-y-3">
          <TagsComponent />
          <RecommededUsers />
        </div>
      </div>
      {/* <div className="">
        <BlogList/>
      </div> */}
    </main>
  );
};

export default HomePage;
