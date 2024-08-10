'use client';
import { CustomToolbar } from '@/components/blogs/CustomToolbar';
import dynamic from 'next/dynamic';
import TagInput from '@/components/blogs/TagInput';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { HiPhotograph } from 'react-icons/hi';
import 'react-quill/dist/quill.snow.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '../ui/image-dropzone';
import { Button } from '@nextui-org/button';
import Container from '../Container';
import { Input } from '@nextui-org/input';
import { ImageIcon } from 'lucide-react';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
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
          input: { type: 'coverImage' },
          onProgressChange: setProgress,
        });
        finalImageUrl = res.url;
        console.log(res);
        console.log('IMG URL', coverImageUrl);

        const response = await axios.post('/api/blog/write', {
          title,
          coverImageUrl: finalImageUrl,
          body,
          tags,
        });
        console.log(response.data); // Log the response on the server
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      try {
        const res = await edgestore.myPublicImages.upload({
          file,
          input: { type: 'bodyImage' },
          // temporary: true,
        });
        const bodyUrl = res.url;
        setBody(
          (prevBody) =>
            `${prevBody}<img src="${bodyUrl}" alt="Uploaded Image" width="500" height="300"/>`
        );
      } catch (err) {
        console.error('Failed to upload image:', err);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Container className='grid lg:grid-cols-4'>
      <div className='p-4 flex flex-col col-span-3'>
        <h1 className='text-2xl font-bold mb-8'>New Post</h1>

        {/* form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* image upload  */}
          <div className='mb-4 flex items-center'>
            <span className='flex items-center gap-4'>
              <ImageIcon />
              {fileName ? `${fileName}` : 'Add a cover image'}
            </span>

            <div className='space-y-2'>
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
              {progress > 0 && (
                <div className='h-1.5 w-44 border rounded overflow-hidden'>
                  <div
                    className='h-full transition-all duration-150'
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <Input
            type='text'
            name='title'
            placeholder='New post title here...'
            value={title}
            onChange={handleInputChange}
            radius='sm'
            size='lg'
          />
          <TagInput value={tags} onChange={handleTagsChange} />
          <CustomToolbar />
          <ReactQuill
            value={body}
            onChange={handleBodyChange}
            modules={modules}
            placeholder='Write your post content here...'
            className='h-[450px] mb-4'
          />

          <Button type='submit' isLoading={loading} color='primary' radius='sm'>
            {loading ? 'Publishing...' : 'Publish'}
          </Button>
          {error && <div className='mt-4 text-red-500'>Error: {error}</div>}
          {success && (
            <div className='mt-4 text-green-500'>
              Success! Your post has been published.
            </div>
          )}
        </form>
      </div>

      <aside className='relative py-20'>
        <div className='p-4 rounded sticky top-40'>
          <h2 className='text-lg font-semibold mb-2'>Publishing Tips</h2>
          <ul className='list-disc list-inside'>
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
      </aside>
    </Container>
  );
};

export default CreatePost;
