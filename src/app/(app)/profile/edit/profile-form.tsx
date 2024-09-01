'use client';
import { User as UserProfileData } from '@/db/schema';
import { useEdgeStore } from '@/lib/edgestore';
import { UserProfileFormData, userProfileSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import axios from 'axios';
import { Camera, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { pronouns } from '@/utils/constants';

function ProfileForm({ profileData, username }: { profileData: UserProfileData, username:string }) {
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [defaultProfileValues] = useState({
    name: profileData.name,
    bio: profileData.bio,
    location: profileData.location,
    pronouns: profileData.pronouns,
    work: profileData.work,
    image: profileData.image,
    website: profileData.website,
    username: profileData.username,
    socials: profileData.socials
      ? profileData.socials.map((link) => ({ link }))
      : [{ link: '' }],
  });

  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: defaultProfileValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'socials',
    control,
  });

  async function onSubmit(data: UserProfileFormData) {
    const transformedData = {
      ...data,
      socials: data.socials ? data.socials.map((item) => item.link) : null,
    };
    console.log(data);
    console.log(transformedData);

    try {
      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/user`, transformedData)
        .then(() => {
          toast.success('Profile updated successfully');
        })
        .then(() => router.push(`/${username}`));
    } catch (error) {
      toast.error('Failed to update profile');
    }
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('pronouns', e.target.value);
  };

  const uploadAvatar = async () => {
    if (!file) return;
    toast.loading('Uploading avatar', { position: 'top-right', id: 'avatar' });

    await edgestore.myPublicImages
      .upload({
        file,
        input: { type: 'bodyImage' },
      })
      .then((res) => {
        setValue('image', res.url);
        toast.success('Avatar uploaded successfully', {
          position: 'top-right',
          id: 'avatar',
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to upload avatar', {
          position: 'top-right',
          id: 'avatar',
        });
      });
  };

  useEffect(() => {
    if (file) {
      uploadAvatar();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-screen-sm mx-auto py-14 space-y-8'
    >
      <div className='relative group overflow-hidden w-fit rounded-full border z-10 mb-2 mx-auto'>
        <Avatar
          src={defaultProfileValues.image ?? '/user-1.png'}
          className='w-28 h-28 text-large'
        />
        <label
          htmlFor='avatar'
          className='absolute inset-0 bg-black/70 cursor-pointer grid place-content-center text-white/80 opacity-0 group-hover:opacity-100 transition duration-300'
        >
          <Camera />
          <span className='sr-only'>change avatar</span>
        </label>
        <input
          id='avatar'
          name='avatar'
          type='file'
          accept='/img*'
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className='sr-only'
        />
      </div>

      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='name'
          label='Name'
          radius='sm'
          description='Your full name'
          {...register('name')}
        />
        {errors.name && (
          <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>
        )}
      </div>

      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='username'
          label='username'
          radius='sm'
          description='Your username'
          disabled
          {...register('username')}
        />
        {errors.username && (
          <p className='px-1 text-xs text-red-600'>{errors.username.message}</p>
        )}
      </div>

      <div className='flex flex-col mb-4'>
        <Textarea
          id='bio'
          label='Bio'
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
        <Select
          label='Pronouns'
          
          defaultSelectedKeys={[defaultProfileValues.pronouns || 'Prefer not to say',]}
          radius='sm'
          fullWidth
          description='How do you identify?'
          onChange={handleSelectionChange}
        >
          {pronouns.map((pronoun) => (
            <SelectItem key={pronoun.key} value={pronoun.key}>{pronoun.label}</SelectItem>
          ))}
        </Select>
        {errors.pronouns && (
          <p className='px-1 text-xs text-red-600'>{errors.pronouns.message}</p>
        )}
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='work'
          label='Work'
          description='Where do you work?'
          radius='sm'
          {...register('work')}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          id='website'
          label='Website'
          description='Your website address'
          radius='sm'
          {...register('website')}
        />
        {errors.website && (
          <p className='px-1 text-xs text-red-600'>{errors.website.message}</p>
        )}
      </div>
      <section>
        <h3 className='text-lg font-semibold'>Socials</h3>
        <p className='text-foreground-400 text-sm mb-3'>
          Add links to your podcast, blog, or social media profiles.
        </p>
        <div className='grid gap-4'>
          <div className='flex flex-col gap-2'>
            {fields.map((field, index) => (
              <div key={field.id} className='flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                  <Input
                    type='text'
                    id={`socials.${index}.link`}
                    radius='sm'
                    {...register(`socials.${index}.link` as const)}
                  />
                  {index > 0 && (
                    <Button
                      isIconOnly
                      title='remove field'
                      size='sm'
                      onClick={() => remove(index)}
                    >
                      <XIcon size={16} />
                    </Button>
                  )}
                </div>
                {errors.socials && errors.socials[index] && (
                  <p className='px-1 text-xs text-red-600'>
                    {errors.socials[index]?.link?.message}
                  </p>
                )}
              </div>
            ))}
            {errors.socials && errors.socials.message && (
              <p className='px-1 text-xs text-red-600'>
                {errors.socials.message}
              </p>
            )}
          </div>
          {fields.length < 5 && (
            <Button
              size='sm'
              className='w-fit'
              onClick={() => append({ link: '' })}
            >
              Add field
            </Button>
          )}
        </div>
      </section>
      <Button
        type='submit'
        color='primary'
        radius='sm'
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}

export default ProfileForm;
