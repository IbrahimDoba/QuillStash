'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button, Input } from '@nextui-org/react';
import { confirmSchema, ConfirmValues } from '@/lib/zod';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export function ConfirmForm({
  username,
  name,
}: {
  name: string;
  username: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmValues>({
    resolver: zodResolver(confirmSchema),
    defaultValues: {
      name: name,
      username: username,
    },
  });

  async function onSubmit(data: ConfirmValues) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        toast.error('Failed to confirm user');
      } else {
        const data: { username: string } = await res.json();
        toast.loading('Success!, Redirecting...');
        redirect(`/${data.username}`);
      }
    } catch (error) {
      console.error('Error confirming user:', error);
      toast.error('An error occurred while saving your details');
    }
  }

  return (
    <div className='grid gap-6 w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <div className='grid gap-2.5'>
            <Input
              id='username'
              placeholder='your-username'
              type='username'
              autoCapitalize='none'
              autoComplete='username'
              autoCorrect='off'
              disabled={isSubmitting}
              {...register('username')}
            />
            {errors?.username && (
              <p className='px-1 text-xs text-red-600'>
                {errors.username.message}
              </p>
            )}
          </div>
          <div className='grid gap-2.5'>
            <Input
              id='name'
              placeholder='your-name'
              type='name'
              autoCapitalize='none'
              autoComplete='name'
              autoCorrect='off'
              disabled={isSubmitting}
              {...register('name')}
            />
            {errors?.username && (
              <p className='px-1 text-xs text-red-600'>
                {errors.username.message}
              </p>
            )}
          </div>
          <Button
            color='primary'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Confirm
          </Button>
          <Button isLoading={isSubmitting} disabled={isSubmitting}>
            Skip
          </Button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <p className='bg-background px-2 text-muted-foreground'>
            You can skip this step and do it later in the settings
          </p>
        </div>
      </div>
    </div>
  );
}
