// pages/api/bookmarks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { bookmarks } from '@/db/schema';
import { db } from '@/db';
import { NextResponse } from 'next/server';

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
      console.log("biikmarked",bookmarks )
    return NextResponse.json({ message: 'Bookmark added successfully' });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      return NextResponse.json({ message: 'Error adding bookmark' });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}