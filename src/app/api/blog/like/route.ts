import { connectDb } from '@/lib/ConnetctDB';
import Comment from '@/models/Comments';
import User from "@/models/User";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Post from '@/models/Post';

export const POST = async (req: Request) => {
  try {
    const { postId } = await req.json();
    connectDb();

    const session = await getServerSession(); // Implement this function to get the current user
    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    const alreadyLikedPost = post.likes.includes(user._id);
    if (alreadyLikedPost) {
        post.likes.pull(user._id);
      // user.likes.pull(post._id);
    } else {
        post.likes.push(user._id);
      // user.likes.push(post._id);
    }
    console.log({likes: post.likes} )
    await post.save();
    // await user.save();
    
    return NextResponse.json({ likes: post.likes }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
