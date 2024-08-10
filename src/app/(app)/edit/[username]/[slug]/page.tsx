"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PostProps } from "@/lib/service";
import { CustomToolbar } from "@/components/blogs/CustomToolbar";
import TagInput from "@/components/blogs/TagInput";
import { HiPhotograph } from "react-icons/hi";
import "react-quill/dist/quill.snow.css";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/ui/image-dropzone";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditPostPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [post, setPost] = useState<PostProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | any>(null);
  const [progress, setProgress] = useState(0);
  const [showImageDropzone, setShowImageDropzone] = useState(false);
  const { edgestore } = useEdgeStore();

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
        console.log(postData.coverImage)
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
  //   console.log("coverImageUrl:", coverImageUrl);
  // }, [coverImageUrl]);
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Confirm image upload and save the URL
      let finalImageUrl = coverImageUrl;
      if (coverImage) {
        const res = await edgestore.myPublicImages.upload({
          file: coverImage,
          input: { type: "coverImage" },
          onProgressChange: setProgress,
        });
        finalImageUrl = res.url;
      }

      await axios.put(`/api/user/${username}/${slug}`, {
        title,
        body,
        tags,
        coverImageUrl: finalImageUrl,
      });
      router.push(`/${username}/${slug}`);
    } catch (error) {
      setError("Error saving post data");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/user/${username}/${slug}`);
      router.push(`/${username}`);
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleCancel = () => {
    router.push(`/${username}/${slug}`);
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
        });
        const bodyUrl = res.url;
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 items-center flex flex-col">
      <div className="flex justify-between items-center mb-4 w-[40%]">
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>
      <form
        className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto"
        onSubmit={handleSave}
      >
        <div className="mb-4">
          {!showImageDropzone && (
            <div className="flex flex-col items-center mb-4">
              {coverImageUrl ? (
                <Image
                  src={coverImageUrl}
                  alt="Cover"
                  width={800} // Add appropriate width and height for Image component
                  height={450}
                  className="w-full max-h-[500px] object-contain h-auto mb-2"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-2">
                  <span>No cover image</span>
                </div>
              )}
              <button
                onClick={() => setShowImageDropzone(true)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Change cover image
              </button>
            </div>
          )}
          {showImageDropzone && (
            <div className="flex flex-col items-center">
              <HiPhotograph className="h-6 w-6 mr-2" />
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
              <button
                onClick={() => setShowImageDropzone(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mt-2"
              >
                Cancel
              </button>

            </div>
          )}
        </div>
        <input
          type="text"
          name="title"
          placeholder="Edit post title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <TagInput value={tags} onChange={handleTagsChange} />
        <CustomToolbar />
        <ReactQuill
          value={body}
          onChange={setBody}
          modules={modules}
          placeholder="Edit your post content here..."
          className="h-[450px] mb-4"
        />
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Editing Tips</h2>
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
        <div className=" flex justify-center items-center space-x-6 mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">
          Delete
        </button>
        <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2">
          Cancel
        </button>
        </div>
      
        {error && <div className="mt-4 text-red-500">Error: {error}</div>}
      </form>
    </div>
  );
};

export default EditPostPage;
