"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import img2 from "../../../public/Assets/bgimg2.jpg";
import { BiComment } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import TruncatedText from "@/lib/truncatedText";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface postProps {
  _id : string;

  tags: [string],
  title: string;
  index:string;
  createdAt:string
  body: string;
  coverImage:string;
  userInfo: {
    username:string;
    userImage:string | any;
    role: string;
    author:string;
  }
}

const BloglistCard = () => {
  const [posts, setPosts] = useState<postProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[720px] mx-auto bg-transperant rounded-xl shadow-md overflow-hidden">
      {posts.map(post => (
        <div key={post._id} className="md:flex bg-white p-4 flex my-8 border border-red-400 items-center justify-around border-gray-300 rounded-lg shadow-lg">
          <div className="md:flex-shrink-0 w-[30%] border">
            <Image
              className="h-56 w-full object-contain"
              loader={() => post.coverImage}
              src={post.coverImage}
              alt="Dev Community"   
              width={400}
              height={300}
            />
          </div>
          <div className="p-8 w-[70%] border ">
          <Link href={`/${post.userInfo.username}`}>
            <div className="flex mr-8 ">
              <div>
                
                <Image
                  src={post.userInfo.userImage || <CgUser className="mr-4" size={30}/>}
                  alt="User"
                  width={70}
                  height={70}
                  className="w-12 h-12 mr-4 rounded-full cursor-pointer"
                />
                
              </div>
              <div>
                <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {post.userInfo.author}
                </h2>
                <small className="mt-2 text-gray-800 text-sm">{new Date(post.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
            </Link>
            <div className="ml-[15%] ">
            <Link href={`/${post.userInfo.username}/${post.title}`}>

            
            <p className=" mt-2 font-extrabold text-gray-800">
              {post.title}
            </p>
            <div>
              <TruncatedText content={post.body} maxLength={100} />
            </div>
            <div className="flex space-x-3">
              {post.tags && post.tags.map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="block mt-4 text-lg leading-tight font-medium text-blue-500 hover:underline"
                >
                  #{tag}
                </a>
              ))}
            </div>

            <p className="mt-2 text-gray-500 flex items-center">
              <BiComment className="mr-2" />
              Comment
            </p>
          </Link>
          </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default BloglistCard;
