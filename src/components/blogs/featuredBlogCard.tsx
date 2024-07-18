"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "../../../public/Assets/bgimg1.jpg";
import BloglistCard from "../blogs/blogListCard";
import axios from "axios";
import TruncatedText from "@/lib/truncatedText";
import Link from "next/link";
import { postProps } from "@/lib/api";

const FeaturedBlogList = () => {
  const [posts, setPosts] = useState<postProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/featuredPost");
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-w-[720px] max-w-[720px]">
      <div className="text-xl w-[50%] items-start justify-around my-3 flex">
        <h2 className="cursor-pointer hover:underline">Latest</h2>
        <h2 className="cursor-pointer hover:underline">Top</h2>
      </div>
      {/* Featured Section */}
      <div className="flex flex-col justify-center items-center bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Featured Blogs</h2>
        <div className="relative w-full h-[500px] overflow-hidden">
          {/* Slider */}
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 cursor-pointer ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
            <Link href={`/${post.userInfo.username}/${post.title}`}>
            <Image
                  loader={() => post.coverImage}
                  src={post.coverImage}
                  alt="Featured Blog"
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                />
                <div className="absolute flex flex-col max-w-[720px] z-30 bottom-0 text-white p-6 bg-black bg-opacity-50 rounded">
                  <h3>Featured</h3>
                  <h2 className="my-2 text-lg font-semibold">{post.title}</h2>
                  <div>
                    <TruncatedText content={post.body} maxLength={100} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogList;
