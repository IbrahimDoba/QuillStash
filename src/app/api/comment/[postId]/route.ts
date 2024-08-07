import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import Comment from "@/models/Comments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: any } }
) {
  const postId = params.postId;
  console.log("POST ID",postId)
  connectDb();

  try {
    // Fetch the post with its comments
    const post = await Post.findOne({ _id:postId });
 
    if (!post) {
      return NextResponse.json({ message: 'post not found' });
  }
     // Fetch the comments of the post and populate replies
     const postComments = await Comment.find({ "userInfo.postId": post._id }).populate('replies');

     // Ensure each comment has a likes array
     const commentsWithLikes = postComments.map(comment => ({
       ...comment.toObject(),
       likes: comment.likes || []
     }));
 
     console.log("COMMENTS", commentsWithLikes);
     return NextResponse.json(commentsWithLikes);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
