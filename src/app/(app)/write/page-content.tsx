'use client';

import TagInput from '@/components/TagInput';
import Container from '@/components/Container';
import TextEditor from '@/components/editor/TextEditor';
import { clientPostSchema, ClientPostValues } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function PageContent() {
  const [saving, setSaving] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<ClientPostValues>({
    resolver: zodResolver(clientPostSchema),
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

  async function onSubmit(values: ClientPostValues) {
    const formData = new FormData();

    // Object.entries(values).forEach(([key, value]) => {
    //   if (value) {
    //     formData.append(key, value);
    //   }
    // });

    try {
      console.log('Form data:', formData);
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
      toast.success('Draft saved successfully');
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
  };

  return (
    <Container className='grid lg:grid-cols-4 py-20'>
      <div className='p-4 flex flex-col col-span-3'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          <div className='flex flex-col mb-4'>
            <Input
              type='file'
              id='image'
              variant='faded'
              radius='sm'
              description='Add a cover image for your post (optional).'
              {...register('image')}
            />
            {errors.image && (
              <p className='px-1 text-xs text-red-600'>
                {errors.image.message}
              </p>
            )}
          </div>

          <div className='flex flex-col mb-4'>
            <Input
              type='text'
              id='title'
              label='Title'
              variant='faded'
              radius='sm'
              size='md'
              description='Your post title, it should be inviting'
              {...register('title')}
            />
            {errors.title && (
              <p className='px-1 text-xs text-red-600'>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className='flex flex-col mb-4'>
            <TagInput tags={tags} setTags={setTags} control={control} />
          </div>

          <div className='flex flex-col mb-4'>
            <Textarea
              type='summary'
              id='summary'
              label='Summary'
              variant='faded'
              radius='sm'
              description='This can be a short introdution to your post (optional).'
              {...register('summary')}
            />
            {errors.summary && (
              <p className='px-1 text-xs text-red-600'>
                {errors.summary.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-3'>
            <TextEditor
              value={getValues().body}
              onChange={handleEditorChange}
            />
            {errors.body && (
              <p className='px-1 text-xs text-red-600'>
                {errors.body.message}
              </p>
            )}
          </div>

          <div className='flex items-center gap-6'>
            <Button disabled={isSubmitting} type='submit' radius='sm' color='primary'>
              {isSubmitting ? 'Publishing...' : 'Publish post'}
            </Button>
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
}

export default PageContent;
