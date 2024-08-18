// import { connectDb } from '@/lib/ConnetctDB';
// import Comment from '@/models/Comments';
// import User from "@/models/User";
// import { NextRequest, NextResponse } from 'next/server';
// import getSession from '@/lib/getSession';

// export const POST = async (req: NextRequest) => {
//   const session = await getSession(); // Implement this function to get the current user
//   try {
//     const { commentId } = await req.json();
//     connectDb();

//     if (!session) {
//       return NextResponse.json(
//         { message: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const user = await User.findOne({ email: session.user?.email });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const comment = await Comment.findById(commentId);
//     if (!comment) {
//       return NextResponse.json({ message: "Comment not found" }, { status: 404 });
//     }

//     const alreadyLiked = comment.likes.includes(user._id);
//     if (alreadyLiked) {
//       comment.likes.pull(user._id);
//       user.likes.pull(comment._id);
//     } else {
//       comment.likes.push(user._id);
//       user.likes.push(comment._id);
//     }
//     console.log({likes: comment.likes} )
//     await comment.save();
//     await user.save();
    
//     return NextResponse.json({ likes: comment.likes }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ success: false }, { status: 400 });
//   }
// }
// export const dynamic = 'force-dynamic';