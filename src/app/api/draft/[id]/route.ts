import { db } from '@/db';
import { posts, drafts } from '@/db/schema';
import { draftSchema, postSchema } from '@/lib/zod';
import { validateRequest } from '@/utils/validateRequest';
import { NextResponse } from 'next/server';
import getSession from '@/lib/getSession';
import { generateSlug } from '@/lib/service';
import { notifyServer } from '@/utils/notify-server';
import { insertTags } from '@/utils/insert-tags';
import { eq } from 'drizzle-orm';

// DELETE
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await validateRequest();

  const session = await getSession();
  const user = session?.user;

  try {
    const requestBody = await req.json();
    const validatedData = postSchema.parse(requestBody);

    const postSummary = validatedData.summary
      ? validatedData.summary
      : "this should now be GPT's response";

    const [newPost] = await db
      .insert(posts)
      .values({
        ...validatedData,
        summary: postSummary,
        slug: generateSlug(validatedData.title),
        userId: user?.id!,
      })
      .returning();

    // Insert tags
    if (validatedData.tags && validatedData.tags.length > 0) {
      try {
        await insertTags(newPost.id, validatedData.tags);
      } catch (tagError) {
        console.error('Error inserting tags:', tagError);
      }
    }

    //  delete  the draft after publishing
    await db.delete(drafts).where(eq(drafts.id, id));

    // Ping the discord server
    notifyServer({
      username: user?.username!,
      author: user?.name!,
      title: newPost.title,
      slug: newPost.slug,
    }).catch((error) => console.error('Failed to send notification:', error));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

//  UPDATE

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await validateRequest();

  const session = await getSession();
  const user = session?.user;

  try {
    const requestBody = await req.json();
    const validatedData = draftSchema.parse(requestBody);

    const [updatedDraft] = await db
      .update(drafts)
      .set({
        ...validatedData,
        userId: user?.id!,
        updatedAt: new Date(),
      })
      .where(eq(drafts.id, id))
      .returning();

    return NextResponse.json(updatedDraft, { status: 200 });
  } catch (error) {
    console.error('Error updating draft:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}