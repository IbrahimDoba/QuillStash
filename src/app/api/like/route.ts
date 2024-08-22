// pages/api/likes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { likes } from '@/db/schema';
import { db } from '@/db';
import { NextResponse } from 'next/server';

export  async function POST(
  req: Request,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { postId, userId } = await req.json();
    console.log(postId, userId)
    try {
      await db.insert(likes).values({
        postId,
        userId,
      });
      console.log("liked",likes )

      return NextResponse.json({ message: 'Like added successfully' });
    } catch (error) {
      console.error('Error adding like:', error);
      return NextResponse.json({ message: 'Error adding like' });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}