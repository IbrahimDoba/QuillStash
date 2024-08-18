// import { connectDb } from '@/lib/ConnetctDB';
// import User from '@/models/User';
// import { NextRequest, NextResponse } from 'next/server';

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { username: string } }
// ) => {
//   await connectDb();

//   const username = params.username;
//   console.log(username);

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return NextResponse.json('user not found', { status: 404 });
//     }
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.error('Error in GET /profile/[username]:', error);
//     return NextResponse.json(
//       { message: 'Internal server error', error: error },
//       { status: 500 }
//     );
//   }
// };
