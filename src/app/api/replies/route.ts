import { db } from '@/db';
import { replies } from '@/db/schema';
import { replySchema } from '@/lib/zod';
import { NextResponse } from 'next/server';
import { validateRequest } from '@/utils/validateRequest';

export async function POST(req: Request) {
  await validateRequest();

  try {
    const requestBody = await req.json();

    const {
      commentId,
      userId,
      body: postBody,
    } = replySchema.parse(requestBody);

    const [newReply] = await db
      .insert(replies)
      .values({
        commentId: commentId,
        userId: userId,
        body: postBody,
      })
      .returning();
    console.log(newReply);

    return NextResponse.json(newReply, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
