import React, { useState, useEffect } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { PostProps } from '@/lib/service';

interface PostLikeProps {
  post: PostProps;
}

const PostLikeComp: React.FC<PostLikeProps> = ({ post }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (session) {
      setIsLiked(post.likes.includes(session.user?.id));
      setIsBookmarked(post.bookmarks.includes(session.user?.id))
    }
  }, [post.likes,post.bookmarks, session]);

  const handleLike = async () => {
    if (!session) return;

    try {
      const response = await axios.post('/api/blog/like', { postId: post._id });
      setLikes(response.data.likes.length);
      // setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const handleBookmark = async () => {
    if (!session) return

    try {
      const response = await axios.post('/api/blog/bookmark', {bookmarkId: post._id})
      // setIsBookmarked(!isBookmarked);

      console.log(response)
    } catch(err){
      console.log(err)
    }
  }
  return (
    <div className='flex flex-col space-y-5 mr-6 mt-6'>
      <div className='flex flex-col justify-center items-center space-y-3'>
        <AiOutlineLike
          size={40}
          className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          onClick={handleLike}
        />
        <p>{likes}</p>
      </div>
      <div className='flex flex-col justify-center items-center space-y-3'>
        <FaRegComments size={40} className='text-gray-500' />
        <p>{post.comments.length}</p>
      </div>
      <div onClick={handleBookmark} className='flex flex-col cursor-pointer justify-center items-center space-y-3'>
        <MdOutlineBookmarkAdd size={40} className={`cursor-pointer ${isBookmarked ? "text-red-500" : "text-gray-500"}`}/>
        <p>{/* Implement bookmark count if needed */}</p>
      </div>
    </div>
  );
};

export default PostLikeComp;
