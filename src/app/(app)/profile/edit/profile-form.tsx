'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostlistCard from '@/components/blogs/postListCard';
import { useSession } from 'next-auth/react';
import { PostProps, UserProfileProps } from '@/lib/service';
import { usePagination } from '@/context/paginationContext';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
  Avatar,
} from '@nextui-org/react';
import Container from '@/components/Container';
import { Camera, Edit } from 'lucide-react';
import { ProfileData } from '../../[username]/page-content';



const ProfileForm = ({ profileData }: any) => { // abeg fix typescript props
  const { username } = useParams();
  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    usePagination();
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    bio: profileData.bio || '',
    location: profileData.location || '',
    pronouns: profileData.pronouns || '',
    work: profileData.work || '',
    github: profileData.github || '',
  });
  console.log(formData)
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `/api/user/${username}?page=${currentPage}&limit=5`
  //       );
  //       setUser(response.data.user);
  //       setPosts(response.data.userPosts);
  //       setTotalPages(response.data.totalPages);
  //       setFormData({
  //         name: response.data.user.name || '',
  //         bio: response.data.user.bio || '',
  //         location: response.data.user.location || '',
  //         pronouns: response.data.user.pronouns || '',
  //         work: response.data.user.work || '',
  //         github: response.data.user.github || '',
  //       });
  //     } catch (error) {
  //       setError('Error fetching user data');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (username) {
  //     fetchUser();
  //   }
  // }, [username, currentPage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('bio', formData.bio);
    form.append('location', formData.location);
    form.append('pronouns', formData.pronouns);
    form.append('work', formData.work);
    form.append('github', formData.github);

    try {
      const response = await axios.put(`/api/user`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
      console.log(response)
      setEditMode(false);
    } catch (error) {
      setError('Error updating user data');
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (!user) return <div>User not found</div>;

  return (
    <form
      onSubmit={handleFormSubmit}
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
          name='name'
          label='Name'
          variant='faded'
          radius='sm'
          description='Your full name'
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Textarea
          name='bio'
          value={formData.bio}
          label='Bio'
          variant='faded'
          radius='sm'
          description='Tell us about yourself'
          onChange={handleInputChange}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          name='location'
          variant='faded'
          label='Location'
          description='Where are you based?'
          radius='sm'
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          name='pronouns'
          label='Pronouns'
          radius='sm'
          variant='faded'
          description='How do you identify'
          value={formData.pronouns}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          name='work'
          label='Work'
          variant='faded'
          description='Where do you work?'
          radius='sm'
          value={formData.work}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex flex-col mb-4'>
        <Input
          type='text'
          name='github'
          variant='faded'
          label='Github'
          description='Your Github profile'
          radius='sm'
          value={formData.github}
          onChange={handleInputChange}
        />
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default ProfileForm;
