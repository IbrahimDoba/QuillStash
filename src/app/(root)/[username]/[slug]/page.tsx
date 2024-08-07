"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { PostProps } from "@/lib/service";
import CommentContainer from "@/components/commentComponent/CommentContainer";
import PostLikeComp from "@/components/blogs/postLikeComp";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";


const BlogPostPage = () => {
  const params = useParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [post, setPost] = useState<PostProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/user/${username}/${slug}`);
        const postData = response.data;
        setPost(postData);
        setTitle(postData.title);
        setBody(postData.body);
        setTags(postData.tags);
        setCoverImageUrl(postData.coverImage);
        console.log("COVERIMAGE URL",coverImageUrl);
        console.log("POSTDATA",postData);
        
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

  // useEffect(() => {
  //   console.log("COVERIMAGE URL", coverImageUrl);
    
  // }, [coverImageUrl]);
 


  const handleEdit = () => {
    router.push(`/edit/${username}/${slug}`);
  };

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
        <div className="flex items-center justify-between mb-6 ">
          <Link href={`/${post.userInfo.username}`}>
            <div className="flex">
              <Image
                width={50}
                height={50}
                className=" rounded-full "
                src={post.userInfo.userImage}
                alt="User Icon"
              />
              <div className="ml-4">
                <h2 className="text-xl font-semibold">
                  {post.userInfo.author}
                </h2>
                <p className="text-gray-600">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
          {session?.user?.id === post.userInfo.authorId && (
            <button onClick={handleEdit} className="text-blue-500">
              Edit
            </button>
          )}
        </div>

        <div>
          <h1 className="text-5xl font-bold mb-2 mt-6">{post.title}</h1>
          <div className="mb-10">{post.tags.join(", ")}</div>
          <div
            className="max-w-none text-xl leading-loose text-gray-800 font-sans"
            dangerouslySetInnerHTML={{ __html: post.body }}
          ></div>
          <div className="mt-10">
            <CommentContainer post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
