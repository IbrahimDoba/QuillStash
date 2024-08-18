'use client';
import { User as UserProfileData } from '@/db/schema';
import { UserProfileFormData, userProfileSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, Button, Input, Textarea } from '@nextui-org/react';
import axios from 'axios';
import { Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function ProfileForm({ profileData, username }: { profileData: UserProfileData, username: string }) {
  const router = useRouter();

  const defaultProfileValues = {
    name: profileData.name,
    bio: profileData.bio,
    location: profileData.location,
    pronouns: profileData.pronouns,
    work: profileData.work,
    github: profileData.github,
  };

  const updateProfile = async (details: UserProfileFormData) => {
    try {
      const response = await axios.put(`/api/user`, details, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: defaultProfileValues,
  });

  async function onSubmit(data: UserProfileFormData) {
    console.log(data)
    try {
      await updateProfile(data)
        .then(() => {
          toast.success('Profile updated successfully');
        })
        .then(() => router.push(`/${username}`));
    } catch (error) {
      toast.error('Failed to update profile');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-screen-sm mx-auto py-14 space-y-8'
    >
      <div className='relative overflow-hidden w-fit rounded-full border z-10 mb-2'>
        <Avatar
          src='https://i.pravatar.cc/150?u=a04258114e29026708c'
          className='w-24 h-24 text-large'
        />
        <span className='absolute inset-0 bg-black/80 grid place-content-center text-white/80'>
          <Camera />
        </span>
      </div>

      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='name'
          label='Name'
          variant='faded'
          radius='sm'
          description='Your full name'
          {...register('name')}
        />
        {errors.name && (
          <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <Textarea
          id='bio'
          label='Bio'
          variant='faded'
          radius='sm'
          description='Tell us about yourself'
          {...register('bio')}
        />
        {errors.bio && (
          <p className='px-1 text-xs text-red-600'>{errors.bio.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='location'
          variant='faded'
          label='Location'
          description='Where are you based?'
          radius='sm'
          {...register('location')}
        />
        {errors.location && (
          <p className='px-1 text-xs text-red-600'>{errors.location.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='pronouns'
          label='Pronouns'
          radius='sm'
          variant='faded'
          description='How do you identify'
          {...register('pronouns')}
        />
        {errors.pronouns && (
          <p className='px-1 text-xs text-red-600'>{errors.pronouns.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='work'
          label='Work'
          variant='faded'
          description='Where do you work?'
          radius='sm'
          {...register('work')}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='github'
          variant='faded'
          label='Github'
          description='Your Github profile'
          radius='sm'
          {...register('github')}
        />
        {errors.github && (
          <p className='px-1 text-xs text-red-600'>{errors.github.message}</p>
        )}
      </div>
      <Button
        type='submit'
        color='primary'
        radius='sm'
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}

export default ProfileForm;
