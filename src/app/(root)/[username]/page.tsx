"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import BloglistCard from "@/components/blogs/blogListCard";
import { useSession } from "next-auth/react";
import { postProps, UserProfileProps } from "@/lib/api";



const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<postProps[]>([]);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/${username}`);
        setUser(response.data.user);
        setPosts(response.data.userPosts)
        console.log("USER AND POSTS",response)

      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          
          <Link href="/settings">
            {" "}
            <button className="p-2 bg-green-300 rounded-xl">Setting </button>
          </Link>
          {/* {user.image && (
            <Image
              src={user.image}
              alt={user.name}
              className="rounded-full"
              width={100}
              height={100}
            />
          )} */}
          <div className="ml-4">
            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-1">@{user.username}</p>
            <p className="text-gray-600 mb-1">{user.bio}</p>
            <p className="text-gray-600 mb-1">{user.location}</p>
            <p className="text-gray-600 mb-1">
              Joined on {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">{user.email}</p>
            {user.github && (
              <a
                href={user.github}
                className="text-blue-500 hover:underline mb-1"
              >
                GitHub
              </a>
            )}
            <p className="text-gray-600 mb-1">{user.pronouns}</p>
            <p className="text-gray-600 mb-1">{user.work}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Posts</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* {user.posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              > */}
                {/* <Link href={`/${username}/${post.title}`}> */}
                  <BloglistCard posts={posts} loading={loading} error={error}/>
                {/* </Link> */}
              {/* </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
