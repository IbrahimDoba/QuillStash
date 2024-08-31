import { db } from '@/db';
import { posts } from '@/db/schema'; 
import { postSchema } from '@/lib/zod';
import { validateRequest } from '@/utils/validateRequest';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await validateRequest();

  try {
    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();
    return Response.json(`deleted the following post: ${deletedPost.id}`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
}

//  UPDATE
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await validateRequest();

  const requestBody = await req.json();
  const validatedData = postSchema.parse(requestBody);

  try {
    const [updatedPost] = await db
      .update(posts)
      .set({ ...validatedData })
      .where(eq(posts.id, id))
      .returning();

    return NextResponse.json(`updated the post: ${updatedPost.id}`, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
}
