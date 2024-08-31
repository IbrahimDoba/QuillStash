'use client';

import Container from '@/components/Container';
import TextEditor from '@/components/editor/TextEditor';
import { postSchema, PostValues } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ConfirmModal from '@/components/editor/confirm-modal';

function PageContent() {
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    control,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: PostValues) {
    try {
      console.log('Form data:', values);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        toast.success('Post created successfully');
        router.push('/home');
      } else {
        toast.error('Failed to create post');
      }
    } catch {
      toast.error('Something went wrong, please try again.');
    }
  }

  const handleSaveDraft = async () => {
    setSaving(true);
    const values = getValues();
    const draftData = {
      title: values.title,
      body: values.body,
      excerpt: values.summary,
      tags: values.tags,
    };

    try {
      // create a new draft
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/draft`, {
        method: 'POST',
        body: JSON.stringify(draftData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        toast.success('Draft saved successfully');
      }
    } catch {
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handleEditorChange = (html: string) => {
    if (html.length > 0) {
      clearErrors('body');
    }
    setValue('body', html);
  };

  return (
    <>
      <nav className='sticky top-0 flex w-full justify-between gap-6 bg-background z-10 py-6'>
        <Button variant='light'>
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
        <div className='flex gap-6'>
          <ConfirmModal
            control={control}
            formRef={formRef}
            register={register}
            setValue={setValue}
            errors={errors}
            isSubmitting={isSubmitting}
          />
          <Button
            onClick={handleSaveDraft}
            variant={'ghost'}
            type='button'
            radius='sm'
            disabled={saving}
            isLoading={saving}
            className='border'
          >
            {saving ? 'Saving...' : 'Save to drafts'}
          </Button>
        </div>
      </nav>

      {/* editor */}
      <Container className='grid lg:grid-cols-4 pt-4 pb-20'>
        <div className='p-4 flex flex-col col-span-3'>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <div className='flex flex-col mb-4'>
              <label htmlFor='title' className='sr-only' />
              <input
                placeholder='Your post title'
                {...register('title')}
                className=' w-full h-20 text-4xl font-bold bg-transparent focus:ring-0 focus:outline-none border-l px-4'
              />
              {errors.title && (
                <p className='px-1 text-xs text-red-600'>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-3'>
              <TextEditor value={watch('body')} onChange={handleEditorChange} />
              {errors.body && (
                <p className='px-1 text-xs text-red-600'>
                  {errors.body.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <aside className='relative py-20'>
          <div className='p-4 rounded sticky top-40'>
            <h2 className='text-lg font-semibold mb-2'>Publishing Tips</h2>
            <ul className='list-disc list-inside'>
              <li>
                Ensure your post has a <b>cover image</b> set to make the most
                of the home feed and social media platforms.
              </li>
              <li>
                Share your post on social media platforms or with your
                co-workers or local communities.
              </li>
              <li>
                Ask people to leave questions for you in the comments. It’s a
                great way to spark additional discussion describing personally
                why you wrote it or why people might find it helpful.
              </li>
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}

export default PageContent;
