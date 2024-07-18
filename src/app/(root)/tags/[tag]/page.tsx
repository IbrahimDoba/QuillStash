"use client"
import React, { useEffect, useState } from 'react';
import BloglistCard from '@/components/blogs/blogListCard';
import { useParams } from "next/navigation";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/blog/tags/${tag}`);
          const data = await response.json();
        console.log(data)
          if (response.ok) {
            setPosts(data);
          } else {
            setError(data.message || 'Error fetching posts');
          }
        } catch (error) {
          setError('Error fetching posts');
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [tag]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <BloglistCard posts={posts} loading={loading} error={error} />
    </div>
  );
};

export default Page;
