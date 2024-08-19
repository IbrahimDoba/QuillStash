import { db } from '@/db';
import { comments } from '@/db/schema'; // Adjust the import path as necessary
import { commentSchema } from '@/lib/zod';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
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
