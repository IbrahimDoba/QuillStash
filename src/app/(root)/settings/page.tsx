"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

const Settings = () => {
  const { data: session, status } = useSession();
  const { username } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    github: '',
    pronouns: '',
    work: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session) {
      router.push('/api/auth/signin');
    } else {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/user/${username}`);
          setFormData({
            name: response.data.name || '',
            bio: response.data.bio || '',
            location: response.data.location || '',
            github: response.data.github || '',
            pronouns: response.data.pronouns || '',
            work: response.data.work || '',
          });
        } catch (error) {
          setError('Error fetching user data');
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [session, status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${username}`, formData);
      router.push(`/${username}`);
    } catch (error) {
      setError('Error updating user data');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full border rounded px-2 py-1"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="block w-full border rounded px-2 py-1"
            placeholder="Bio"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="block w-full border rounded px-2 py-1"
            placeholder="Location"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            className="block w-full border rounded px-2 py-1"
            placeholder="GitHub"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pronouns</label>
          <input
            type="text"
            name="pronouns"
            value={formData.pronouns}
            onChange={handleInputChange}
            className="block w-full border rounded px-2 py-1"
            placeholder="Pronouns"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Work</label>
          <input
            type="text"
            name="work"
            value={formData.work}
            onChange={handleInputChange}
            className="block w-full border rounded px-2 py-1"
            placeholder="Work"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
