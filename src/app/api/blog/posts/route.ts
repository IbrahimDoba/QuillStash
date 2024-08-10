import { connectDb } from '@/lib/ConnetctDB';
import Post from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';

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
