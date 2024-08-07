import { connectDb } from '@/lib/ConnetctDB';
import Comment from '@/models/Comments';
import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(); // Implement this function to get the current user
  try {
    const { commentId, body } = await req.json();
    connectDb();

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
    
    // Create a new reply
    const newReply = new Comment({
      userInfo: {
        username: user.username,
        userImage: user.image,
        author: user.name,
        role: user.role,
        authorId: user._id,
      },
      body,
      likes: 0,
    });

    // Save the new reply
    const savedReply = await newReply.save();

    // Add reply to the original comment
    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: savedReply._id },
    });

    return NextResponse.json(savedReply, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
