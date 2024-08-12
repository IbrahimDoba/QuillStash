import { connectDb } from '@/lib/ConnetctDB';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; 
import { posts } from '@/db/schema'; 
import { sql } from 'drizzle-orm';
import { desc } from 'drizzle-orm/expressions';

export const GET = async (req: NextRequest) => {
  await connectDb();
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 2;
  const skip = (page - 1) * limit;

  // 3 posts per page

  try {
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const hasNextPage = page < totalPages;

    return NextResponse.json(
      {
        posts,
        nextPage,
        totalPages,
        hasNextPage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
};

// once there are posts in the neon db we will use this instad of the above
// export const DrizzleVersion = async (req: NextRequest) => {
//   const { searchParams } = new URL(req.url);
//   const pageParam = searchParams.get('page');
//   const limitParam = searchParams.get('limit');

//   const page = pageParam ? parseInt(pageParam) : 1;
//   const limit = limitParam ? parseInt(limitParam) : 2;
//   const skip = (page - 1) * limit;

//   // 3 posts per page

//   try {
//     // Count total posts
//     const [{ count }] = await db
//       .select({ count: sql`count(*)`.mapWith(Number) })
//       .from(posts);

//     const totalPosts = Number(count);
//     const totalPages = Math.ceil(totalPosts / limit);

//     // Fetch paginated posts
//     const fetchedPosts = await db
//       .select()
//       .from(posts)
//       .orderBy(desc(posts.createdAt))
//       .limit(limit)
//       .offset(skip);

//     const nextPage = page < totalPages ? page + 1 : null;
//     const hasNextPage = page < totalPages;

//     return NextResponse.json(
//       {
//         posts: fetchedPosts,
//         nextPage,
//         totalPages,
//         hasNextPage,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'server error' }, { status: 500 });
//   }
// };
