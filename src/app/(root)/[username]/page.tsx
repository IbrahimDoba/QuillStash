"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PostlistCard from "@/components/blogs/postListCard";
import { useSession } from "next-auth/react";
import { PostProps, UserProfileProps } from "@/lib/service";
import SettingsModal from "@/components/modals/settingsModal";
import { usePagination } from "@/context/paginationContext";

const UserProfile = () => {
  const { username } = useParams();
  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    usePagination();
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    pronouns: "",
    work: "",
    github: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/user/${username}?page=${currentPage}&limit=5`
        );
        setUser(response.data.user);
        setPosts(response.data.userPosts);
        setTotalPages(response.data.totalPages);
        setFormData({
          name: response.data.user.name || "",
          bio: response.data.user.bio || "",
          location: response.data.user.location || "",
          pronouns: response.data.user.pronouns || "",
          work: response.data.user.work || "",
          github: response.data.user.github || "",
        });
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username, currentPage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("bio", formData.bio);
    form.append("location", formData.location);
    form.append("pronouns", formData.pronouns);
    form.append("work", formData.work);
    form.append("github", formData.github);

    try {
      const response = await axios.put(`/api/user/${username}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      setError("Error updating user data");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
        {session?.user?.id === user._id && (
            <button onClick={handleEdit} className="text-blue-500">
              Edit
            </button>
          )}
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
            <PostlistCard
              posts={posts}
              loading={loading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handlePageClick={handlePageClick}
            />{" "}
          </div>
         
        </div>
      </div>
      {editMode && (
        <SettingsModal onClose={() => setEditMode(false)}>
          <form onSubmit={handleFormSubmit} className="w-full p-4">
            <div className="flex flex-col mb-4">
              <label className="mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Pronouns:</label>
              <input
                type="text"
                name="pronouns"
                value={formData.pronouns}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Work:</label>
              <input
                type="text"
                name="work"
                value={formData.work}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="mb-2">GitHub:</label>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="p-2 bg-gray-500 text-white rounded mr-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </SettingsModal>
      )}
    </div>
  );
};

export default UserProfile;
