import getSession from '@/lib/getSession';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import { db } from '@/db';
import { validateRequest } from '@/utils/validateRequest';
import { serverUserProfileSchema } from '@/lib/zod';

export const PUT = async (req: any) => {
  await validateRequest();
  const session = await getSession();
  const user = session?.user;

  const requestBody = await req.json();
  const validatedData = serverUserProfileSchema.parse(requestBody);

  try {

    const [updatedUser] = await db
      .update(users)
      .set({ ...validatedData })
      .where(eq(users.email, session?.user.email!))
      .returning();
    console.log(updatedUser);

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';