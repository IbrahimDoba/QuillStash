import getSession from '@/lib/getSession';
import { draftSchema, postSchema } from '@/lib/zod';
import { validateRequest } from '@/utils/validateRequest';
import { NextResponse } from 'next/server';
import { drafts } from '@/db/schema';
import { db } from '@/db';

export async function POST(req: Request) {
  await validateRequest();
  const session = await getSession();
  const user = session?.user;

  try {
    const requestBody = await req.json();
    const validatedData = draftSchema.parse(requestBody);

    const [newDraft] = await db
      .insert(drafts)
      .values({
        ...validatedData,
        userId: user?.id!,
      })
      .returning();

    return NextResponse.json(newDraft.id, { status: 201 });
  } catch (error) {
    console.error('Error saving draft:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
