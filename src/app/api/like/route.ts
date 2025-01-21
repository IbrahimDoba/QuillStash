// pages/api/likes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { likes } from '@/db/schema';
import { db } from '@/db';
import { NextResponse } from 'next/server';
import { and, count, eq } from 'drizzle-orm';
import { validateRequest } from '@/utils/validateRequest';

export async function POST(req: Request, res: NextApiResponse) {
  const { postId, userId } = await req.json();
  await validateRequest();

  try {
    await db.insert(likes).values({
      postId,
      userId,
    });

    return NextResponse.json({ message: 'Like added successfully' });
  } catch (error) {
    console.error('Error adding like:', error);
    return NextResponse.json({ message: 'Error adding like' });
  }
}

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
    const likesCount = await db
      .select({ value: count() })
      .from(likes)
      .where(eq(likes.postId, postId));

    return NextResponse.json({ likesCount: likesCount[0].value });
  } catch (error) {
    console.error('Error fetching likes count:', error);
    return NextResponse.json(
      { message: 'Error fetching likes count' },
      { status: 500 }
    );
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
    await db.delete(likes).where(
      and(
        eq(likes.postId, postId),
        eq(likes.userId, userId)
      )
    );

    return NextResponse.json({ message: 'Like removed successfully' });
  } catch (error) {
    console.error('Error removing like:', error);
    return NextResponse.json(
      { message: 'Error removing like' },
      { status: 500 }
    );
  }
}