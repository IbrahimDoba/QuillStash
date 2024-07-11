"use client";
import { CustomToolbar } from "@/components/blogs/CustomToolbar";
import dynamic from "next/dynamic";
import TagInput from "@/components/blogs/TagInput";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface FormData {
  title: string;
  coverImage: File | null;
  body: string;
  tags: string[];
}

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    coverImage: null,
    body: "",
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file!.name);
    setFormData({
      ...formData,
      coverImage: file,
    });
    console.log(formData.coverImage);
  };

  const handleTagsChange = (newTags: string[]) => {
    setFormData({
      ...formData,
      tags: newTags,
    });
  };

  const handleBodyChange = (value: string) => {
    setFormData({
      ...formData,
      body: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }
      data.append("body", formData.body);
      data.append("tags", JSON.stringify(formData.tags));

      const response = await axios.post("/api/blog/write", data);
      console.log(response.data); // Log the response on the server

      setSuccess(true);
      setFormData({
        title: "",
        coverImage: null,
        body: "",
        tags: [],
      });
    } catch (err) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const formData = new FormData();
      formData.append("bodyImage", file);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const url = response.data.url;

        const quill = (this as any).quill; // TypeScript casting
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", url);
      } catch (err) {
        console.error("Failed to upload image:", err);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 items-center flex flex-col">
      <div className="flex justify-between items-center mb-4 w-[40%]">
        <h1 className="text-2xl font-bold">Create Post</h1>
        <div className="flex space-x-2">
          {/* <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Publish
          </button> */}
          <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Save draft
          </button>
        </div>
      </div>
      <form
        className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="flex items-center bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
            <HiPhotograph className="h-6 w-6 mr-2" />
            {fileName ? `${fileName}` : "Add a cover image"}

            <input
              type="file"
              onChange={handleCoverImageChange}
              className="hidden"
            />
          </label>
        </div>
        <input
          type="text"
          name="title"
          placeholder="New post title here..."
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <TagInput onChange={handleTagsChange} />
        <CustomToolbar />
        <ReactQuill
          value={formData.body}
          onChange={handleBodyChange}
          modules={modules}
          placeholder="Write your post content here..."
          className="h-[450px] mb-4"
        />
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Publishing Tips</h2>
          <ul className="list-disc list-inside">
            <li>
              Ensure your post has a <b>cover image</b> set to make the most of
              the home feed and social media platforms.
            </li>
            <li>
              Share your post on social media platforms or with your co-workers
              or local communities.
            </li>
            <li>
              Ask people to leave questions for you in the comments. It’s a
              great way to spark additional discussion describing personally why
              you wrote it or why people might find it helpful.
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
        {error && <div className="mt-4 text-red-500">Error: {error}</div>}
        {success && (
          <div className="mt-4 text-green-500">
            Success! Your post has been published.
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
