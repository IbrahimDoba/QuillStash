"use client";
import React, { useEffect, useState } from "react";
import BloglistCard  from "../blogs/blogListCard";

import FeaturedBlogList from "../blogs/featuredBlogCard";
import { postProps } from "@/lib/api";
import axios from "axios";

const BlogsComponent = () => {
  const [posts, setPosts] = useState<postProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/blog/getPosts');
        setPosts(response.data);
        console.log(response)
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <FeaturedBlogList />
      <div className="my-6 space-y-3">
        <BloglistCard posts={posts} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default BlogsComponent;
