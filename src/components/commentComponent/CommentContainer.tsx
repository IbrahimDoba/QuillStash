// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { useSession } from 'next-auth/react';
// import { HeartIcon } from '@heroicons/react/16/solid';
// import { Heart } from 'lucide-react';
// import { Post } from '@/db/schema';

// interface CommentContainerProps {
//   post: Post;
// }

// const CommentContainer: React.FC<CommentContainerProps> = ({ post }) => {
//   const { data: session } = useSession();
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [replyingTo, setReplyingTo] = useState<string | null>(null);
//   const [newReply, setNewReply] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/comment/${post._id}`);
//         console.log("COMMENTS",session)
//         setComments(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, [post]);

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post('/api/comment', {
//         postId: post._id,
//         body: newComment,
//       });
//       setComments([...comments, response.data]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddReply = async (commentId: string) => {
//     if (!newReply.trim()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post('/api/comment/reply', {
//         commentId,
//         body: newReply,
//       });
//       setComments(comments.map(comment =>
//         comment._id === commentId
//           ? { ...comment, replies: [...(comment.replies || []), response.data] }
//           : comment
//       ));
//       setNewReply('');
//       setReplyingTo(null);
//     } catch (error) {
//       console.error('Error adding reply:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLike = async (commentId: string) => {
//     if (!session) return;

//     try {
//       const response = await axios.post('/api/comment/like', { commentId });
//       const updatedLikes = response.data.likes;
//       setComments(comments.map(comment =>
//         comment._id === commentId ? { ...comment, likes: updatedLikes } : comment
//       ));
//     } catch (error) {
//       console.error('Error liking comment:', error);
//     }
//   };

//   const isLikedByUser = (comment: CommentProps) => {
//     if (!session) return false;
//     const userId = session?.user?.id;
 
//     return comment.likes.includes(userId);
//   };
  

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-semibold mb-4">Comments</h3>
//       <ul className="space-y-4">
//         {comments.map((comment) => (
//           <li key={comment._id} className="border p-4 rounded-lg">
//             <div className="flex items-center space-x-4 mb-2">
//               <Image
//                 src={comment.userInfo.userImage}
//                 alt={`${comment.userInfo.username}'s avatar`}
//                 className="w-8 h-8 rounded-full"
//                 width={32}
//                 height={32}
//               />
//               <p className="font-medium">{comment.userInfo.username}</p>
//               <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
             
//             </div>
//             <p>{comment.body}</p>
//             <div className="flex items-center space-x-2">
//               <button onClick={() => handleLike(comment._id)}>
//                 {isLikedByUser(comment) ? (
//                   <HeartIcon className="w-6 h-6 text-red-500" />
//                 ) : (
//                   <Heart className="w-6 h-6 text-gray-500" />
//                 )}
//               </button>
//               <span>{comment.likes.length}</span>
//               </div>
//             <button className='p-2 bg-blue-400 rounded-xl text-white my-3' onClick={() => setReplyingTo(comment._id)}>Reply</button>
//             {replyingTo === comment._id && (
//               <div className="mt-2">
//                 <textarea
//                   value={newReply}
//                   onChange={(e) => setNewReply(e.target.value)}
//                   placeholder="Add a reply..."
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 <button
//                   onClick={() => handleAddReply(comment._id)}
//                   className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   disabled={loading}
//                 >
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//             )}
//             {comment.replies && (
//               <ul className="ml-4 mt-2 space-y-2">
//                 {comment.replies.map(reply => (
//                   <li key={reply._id} className="border p-2 rounded-lg">
//                     <div className="flex items-center space-x-4 mb-2">
//                       <Image
//                         src={reply.userInfo.userImage}
//                         alt={`${reply.userInfo.username}'s avatar`}
//                         className="w-6 h-6 rounded-full"
//                         width={24}
//                         height={24}
//                       />
//                       <p className="font-medium">{reply.userInfo.username}</p>
//                       <span className="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
                     
//                     </div>
//                     <p>{reply.body}</p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//       <div className="mt-6">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//           className="w-full p-2 border rounded-lg"
//         />
//         <button
//           onClick={handleAddComment}
//           className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={loading}
//         >
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CommentContainer;


// {/* <button onClick={() => handleLike(reply._id)}> */}
// {/* <HeartIcon className={`w-6 h-6 ${reply.likes.includes(post.userInfo.author) ? 'text-red-500' : 'text-gray-500'}`} /> */}
// // </button>

// {/* <button onClick={() => handleLike(comment._id)}> */}
// {/* <HeartIcon className={`w-6 h-6 ${comment.likes.includes(post.userInfo.author) ? 'text-red-500' : 'text-gray-500'}`} /> */}
// {/* </button> */}