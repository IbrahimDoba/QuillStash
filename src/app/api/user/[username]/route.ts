// import { connectDb } from '@/lib/ConnetctDB';
// import Post from '@/models/Post';
// import User from '@/models/User';
// import { NextApiRequest, NextApiResponse } from 'next';
// import getSession from '@/lib/getSession';
// import { NextRequest, NextResponse } from 'next/server';

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { username: string } }
// ) => {
//   await connectDb();

//   const username = params.username;
//   const { searchParams } = new URL(req.url);
//   console.log(username);

//   const pageParam = searchParams.get('page');
//   const limitParam = searchParams.get('limit');

//   const page = pageParam ? parseInt(pageParam) : 1;
//   const limit = limitParam ? parseInt(limitParam) : 5;
//   const skip = (page - 1) * limit;

//   if (req.method === 'GET') {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         return NextResponse.json({ message: 'User not found' });
//       }
//       const totalPosts = await Post.countDocuments({
//         'userInfo.authorId': user._id,
//       });
//       const userPosts = await Post.find({ 'userInfo.authorId': user._id })
//         .skip(skip)
//         .limit(limit);

//       const response = {
//         user,
//         userPosts,
//         totalPages: Math.ceil(totalPosts / limit),
//         currentPage: page,
//       };

//       return NextResponse.json(response);
//     } catch (error) {
//       return NextResponse.json({ message: 'Internal server error' });
//     }
//   }
// };

// export const PUT = async (
//   req: any,
//   { params }: { params: { username: string } }
// ) => {
//   await connectDb();
//   try {
//     const username = params.username;
//     const session = await getSession();

//     const form = await req.formData();
//     const name = form.get('name') as string;
//     const bio = form.get('bio') as string;
//     const location = form.get('location') as string;
//     const pronouns = form.get('pronouns') as string;
//     const work = form.get('work') as string;
//     const github = form.get('github') as string;

//     const user = await User.findOneAndUpdate(
//       { username },
//       { name, bio, location, pronouns, work, github },
//       { new: true }
//     );
//     // console.log(user)
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' });
//     }
//     // if (user.id.toString() !== session.user.id) {
//     //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     //   }

//     return NextResponse.json(user);
//   } catch (error) {
//     return NextResponse.json({ message: 'Internal server error' });
//   }
// };
// export const dynamic = 'force-dynamic';
