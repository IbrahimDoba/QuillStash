import { db } from '@/db';
import { comments } from '@/db/schema'; 
import { commentSchema } from '@/lib/zod';
import { NextResponse } from 'next/server';
import { validateRequest } from '@/utils/validateRequest';

export async function POST(req: Request) {
  await validateRequest();
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the request body with Zod
    const validatedData = commentSchema.parse(body);

    // Create the comment
    const [newComment] = await db
      .insert(comments)
      .values({
        postId: validatedData.postId,
        userId: validatedData.userId,
        body: validatedData.body,
      })
      .returning();
      console.log(newComment)

    // Return the created comment
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
