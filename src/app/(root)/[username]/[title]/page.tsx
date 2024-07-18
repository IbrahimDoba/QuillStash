"use client"
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { postProps } from '@/lib/api';

const BlogPostPage = () => {
  const { username, title } = useParams();
  const [post, setPost] = useState<postProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/user/${username}/${title}`);
        
        setPost(response.data);
        console.log(response)
      } catch (error) {
        setError('Error fetching post data');
      } finally {
        setLoading(false);
      }
    };

    if (username && title) {
      fetchPost();
    }
  }, [username, title]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
      {post.coverImage && (
          <Image
            src={post.coverImage}
            loader={() => post.coverImage}

            alt={post.title}
            className="rounded-lg w-[500px] mb-6"
            width={500}
            height={400}
            layout="responsive"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center mb-6">
          <div className="ml-4">
            {/* <h2 className="text-xl font-semibold">{post.author.name}</h2>
            <p className="text-gray-600">@{post.author.username}</p> */}
            <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
       
        <div className=" max-w-none" dangerouslySetInnerHTML={{ __html: post.body }}></div>
      </div>
    </div>
  );
};

export default BlogPostPage;
