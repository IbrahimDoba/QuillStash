// pages/api/bookmarks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { bookmarks } from '@/db/schema';
import { db } from '@/db';
import { NextResponse } from 'next/server';
import { and, count, eq } from 'drizzle-orm';
import { validateRequest } from '@/utils/validateRequest';

export  async function POST(
  req: Request,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { postId, userId } = await req.json();

    try {
      await db.insert(bookmarks).values({
        postId,
        userId,
      });
    return NextResponse.json({ message: 'Bookmark added successfully' });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      return NextResponse.json({ message: 'Error adding bookmark' });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  const userId = searchParams.get('userId');

  if (!postId || !userId) {
    return NextResponse.json(
      { message: 'Post ID and User ID are required' },
      { status: 400 }
    );
  }

  await validateRequest();

  try {
    await db.delete(bookmarks).where(
      and(
        eq(bookmarks.postId, postId),
        eq(bookmarks.userId, userId)
      )
    );

    return NextResponse.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Error removing Bookmark:', error);
    return NextResponse.json(
      { message: 'Error removing Bookmark' },
      { status: 500 }
    );
  }
}