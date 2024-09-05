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
import { Draft } from '@/db/schema';
import ErrorMessage from '@/components/ui/error-message';

function PageContent({ draftData }: { draftData: Draft }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [previousValues] = useState<PostValues>({
    title: draftData.title || '',
    body: draftData.body || '',
    summary: draftData.summary || '',
    tags: draftData.tags || [],
    coverImage: draftData.coverImage,
  });

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: previousValues,
  });
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    getValues,
    control,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: PostValues) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/draft/${draftData.id}`,
        {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        toast.success('Draft published successfully');
        router.push('/home');
      } else {
        toast.error('Failed to publish draft');
      }
    } catch {
      toast.error('Something went wrong, please try again.');
    }
  }

  const handleSaveDraft = async () => {
    if (getValues().title.trim().length === 0) {
      return toast.error('Please add a title to save the draft');
    }
    setSaving(true);
    const data = getValues();

    try {
      // Update the existing draft
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/draft/${draftData.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ ...data }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.ok) {
        toast.success('Draft updated successfully');
      } else {
        toast.error('Failed to update draft');
      }
    } catch {
      toast.error('Something went wrong, please try again.');
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
        <Button variant='light' radius='sm' href='/home'>
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>

        <div className='flex gap-6'>
          <PublishSettings
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
