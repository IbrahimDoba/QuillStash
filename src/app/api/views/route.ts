import { db } from '@/db';
import { NextResponse } from 'next/server';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

// API route to get the view count of a specific post
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json(
      { message: 'Post ID is required' },
      { status: 400 }
    );
  }

  try {
    // Query the posts table to get the views count for the given postId
    const post = await db
      .select({ views: posts.views })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ viewsCount: post[0].views });
  } catch (error) {
    console.error('Error fetching views count:', error);
    return NextResponse.json(
      { message: 'Error fetching views count' },
      { status: 500 }
    );
  }
}
