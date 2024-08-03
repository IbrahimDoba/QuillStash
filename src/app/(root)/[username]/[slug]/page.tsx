"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { PostProps } from "@/lib/service";
import CommentContainer from "@/components/commentComponent/CommentContainer";
import PostLikeComp from "@/components/blogs/postLikeComp";

const BlogPostPage = () => {
  const params = useParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [post, setPost] = useState<PostProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(username, slug)
    const fetchPost = async () => {
      try {
        // const encodedTitle = encodeURIComponent(title);
        // console.log(encodedTitle)
        const response = await axios.get(`/api/user/${username}/${slug}`);
        console.log(response);

        setPost(response.data);
      } catch (error) {
        setError("Error fetching post data");
      } finally {
        setLoading(false);
      }
    };

    if (username && slug) {
      fetchPost();
    }
  }, [username, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-[1380px] mx-auto p-4  justify-center items-start flex">
      <PostLikeComp post={post} />
      <div className="bg-white shadow-md rounded-lg p-10 m-4 max-w-4xl ">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            loader={() => post.coverImage}
            alt={post.title}
            className="rounded-lg w-[500px] max-h-[500px] mb-6 object-cover"
            width={500}
            height={400}
            layout="responsive"
          />
        )}
        <div className="flex items-center mb-6">
          <div>Icon</div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{post.userInfo.author}</h2>
            <p className="text-gray-600">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-2 mt-6">{post.title}</h1>
        <div className="mb-10">{post.tags}</div>
        <div
          className="max-w-none  text-xl leading-loose text-gray-800 font-sans"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>
        <div className="mt-10">
          <CommentContainer post={post} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
