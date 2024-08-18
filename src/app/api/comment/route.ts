// import { connectDb } from '@/lib/ConnetctDB';
// import Comment from '@/models/Comments';
// import Post from '@/models/Post';
// import { NextRequest, NextResponse } from 'next/server';
// import User from "@/models/User";
// import getSession from '@/lib/getSession';



// export const POST = async (req: NextRequest) => {
//   const session = await getSession(); // Implement this function to get the current user
//   try {
//     const { postId, userInfo, body } = await req.json();
//     connectDb()

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
    
//     // console.log("TEST",postId,body)
//     // Create a new comment
//     const newComment = new Comment({
//       userInfo: {
//         username: user.username,
//         userImage: user.image,
//         author: user.name,
//         role: user.role,
//         authorId: user._id,
//         postId: postId
//       },
//       body,
      
//     });
//     // save comment
//     const saveComment = await newComment.save()
//     // Add comment to user
//     await User.findByIdAndUpdate( user._id, {
//       $push: { comments: newComment._id },
//     });
//     // Add comment to post
//     await Post.findByIdAndUpdate(postId, {
//       $push: { comments: newComment._id },
//     });

//     console.log(newComment)
//     return NextResponse.json(saveComment, { status: 201 });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ success: false}, { status: 400 });
//   }
// }

// export const dynamic = 'force-dynamic';