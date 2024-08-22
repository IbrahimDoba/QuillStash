import { db } from '@/db';
import { replies } from '@/db/schema'; 
import { replySchema } from '@/lib/zod';
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
    const [deletedReply] = await db
      .delete(replies)
      .where(eq(replies.id, id))
      .returning();
    return Response.json(`deleted: ${deletedReply.id}`, { status: 200 });
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
  const { body } = replySchema.parse(requestBody);

  try {
    const [updatedReply] = await db
      .update(replies)
      .set({ body: body })
      .where(eq(replies.id, id))
      .returning();

    return NextResponse.json(`updated: ${updatedReply.id}`, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
}
