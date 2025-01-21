'use client';

import Container from '@/components/Container';
import TextEditor from '@/components/editor/TextEditor';
import { postSchema, PostValues } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import PublishSettings from '@/components/editor/PublishSettings';
import { Post } from '@/db/schema';
import ErrorMessage from '@/components/ui/error-message';

function PageContent({ previousPostData }: { previousPostData: Post }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [previousValues] = useState<PostValues>({
    title: previousPostData.title,
    body: previousPostData.body,
    summary: previousPostData.summary,
    tags: previousPostData.tags,
    coverImage: previousPostData.coverImage,
  });

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: previousValues,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    control,
    trigger,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: PostValues) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${previousPostData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        toast.success('Post updated successfully');
        router.push('/home');
      } else {
        toast.error('Failed to update post');
      }
    } catch {
      toast.error('Something went wrong, please try again.');
    }
  }

  const handleEditorChange = (html: string) => {
    if (html.length > 0) {
      clearErrors('body');
    }
    setValue('body', html);
  };

  return (
    <>
      <nav className='sticky top-0 flex w-full justify-between gap-6 bg-background z-10 py-6'>
        <Button variant='light' radius='sm' href='/home'>
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>

        <PublishSettings
          control={control}
          formRef={formRef}
          register={register}
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          defaultCoverImage={previousValues.coverImage}
          trigger={trigger}
        />
      </nav>

      {/* editor */}
      <Container className='grid pt-4 pb-20 max-w-screen-lg'>
        <div className='p-4 flex flex-col'>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8 border dark:border-foreground-50 rounded-md p-4'
          >
            <div className='flex flex-col'>
              <label htmlFor='title' className='sr-only' />
              <input
                placeholder='Title'
                {...register('title')}
                className=' w-full h-20 text-4xl font-bold bg-transparent focus:ring-0 focus:outline-none px-4'
              />
              {errors.title && (
                <ErrorMessage message={errors.title.message} className='px-1' />
              )}
            </div>

            <div className='flex flex-col gap-3'>
              <TextEditor value={watch('body')} onChange={handleEditorChange} />
              {errors.body && (
                <ErrorMessage message={errors.body.message} className='px-1' />
              )}
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default PageContent;
