import { db } from '@/db';
import { eq, inArray } from 'drizzle-orm';
import { comments, users, replies } from '@/db/schema'; // Adjust the import path as necessary

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
    

    return Response.json(commentsWithReplies, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify('Something went wrong'), {
      status: 500,
    });
  }
}
