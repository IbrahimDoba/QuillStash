import getSession from '@/lib/getSession';
import { postSchema } from '@/lib/zod';
import { validateRequest } from '@/utils/validateRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await validateRequest();
  const session = await getSession();
  const user = session?.user;

  try {
    const requestBody = await req.json();
    const validatedData = postSchema.parse(requestBody);

    //   const [newPost] = await db

    return NextResponse.json('Draft saved', { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
