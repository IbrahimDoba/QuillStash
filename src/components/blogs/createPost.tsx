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
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../ui/image-dropzone";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [coverImage, setCoverImage] = useState<File | any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Confirm image upload and save the URL
      let finalImageUrl = imageUrl;
      if (coverImage) {
        const res = await edgestore.myPublicImages.upload({
          file: coverImage,
          input: { type: "coverImage" },
          onProgressChange: setProgress,
        });
        finalImageUrl = res.url;
        console.log(res);
        console.log("IMG URL", coverImageUrl);

        const response = await axios.post("/api/blog/write", {
          title,
          coverImageUrl: finalImageUrl,
          body,
          tags,
        });
        console.log(response.data); // Log the response on the server
        setSuccess(true);
      }
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

      try {
        const res = await edgestore.myPublicImages.upload({
          file,
          input: { type: "bodyImage" },
          // temporary: true,
        });
      const  bodyUrl = res.url
      setBody((prevBody) => `${prevBody}<img src="${bodyUrl}" alt="Uploaded Image" width="500" height="300"/>`);
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
        <div className="mb-4 ">
          <label className="flex  flex-col items-center bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
            <HiPhotograph className="h-6 w-6 mr-2" />
            {fileName ? `${fileName}` : "Add a cover image"}

            <SingleImageDropzone
              width={200}
              height={200}
              value={coverImage}
              dropzoneOptions={{
                maxSize: 1024 * 1024 * 1, // 1MB
              }}
              onChange={(file) => {
                setCoverImage(file ?? null);
              }}
            />
            <div className="h-[6px] w-44 border rounded overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </label>
        </div>
        <input
          type="text"
          name="title"
          placeholder="New post title here..."
          value={title}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <TagInput onChange={handleTagsChange} />
        <CustomToolbar />
        <ReactQuill
          value={body}
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

// data.append("tags", JSON.stringify(formData.tags));
