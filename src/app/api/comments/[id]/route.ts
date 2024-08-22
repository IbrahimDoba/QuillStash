import { db } from '@/db';
import { comments, replies } from '@/db/schema'; // Adjust the import path as necessary
import { commentSchema } from '@/lib/zod';
import { validateRequest } from '@/utils/validateRequest';
import { eq, inArray } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch comments for the post
    const postComments = await db.query.comments.findMany({
      where: eq(comments.postId, id),
      with: {
        user: {
          columns: {
            username: true,
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });

    // Fetch replies for these comments
    const commentIds = postComments.map((comment) => comment.id);

    const commentReplies = await db.query.replies.findMany({
      where: inArray(replies.commentId, commentIds),
      with: {
        user: {
          columns: {
            username: true,
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });

    // Merge replies into comments
    const commentsWithReplies = postComments.map((comment) => ({
      ...comment,
      replies: commentReplies.filter((reply) => reply.commentId === comment.id),
    }));

    console.log('Comments response: ', commentsWithReplies);

    return Response.json(commentsWithReplies, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await validateRequest();

  try {
    const [deletedComment] = await db
      .delete(comments)
      .where(eq(comments.id, id))
      .returning();
    return Response.json(`deleted: ${deletedComment.id}`, { status: 200 });
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
  const { body } = commentSchema.parse(requestBody);

  try {
    const [updatedComment] = await db
      .update(comments)
      .set({ body: body })
      .where(eq(comments.id, id))
      .returning();

    return NextResponse.json(`updated: ${updatedComment.id}`, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
}
