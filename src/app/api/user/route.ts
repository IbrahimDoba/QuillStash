import getSession from '@/lib/getSession';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema'; // Assuming you've defined your schema
import { db } from '@/db';

export const PUT = async (req: any) => {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const form = await req.formData();
    console.log(form);
    const name = form.get('name') as string;
    const bio = form.get('bio') as string;
    const location = form.get('location') as string;
    const pronouns = form.get('pronouns') as string;
    const work = form.get('work') as string;
    const github = form.get('github') as string;

    const [updatedUser] = await db
      .update(users)
      .set({ name, bio, location, pronouns, work, github })
      .where(eq(users.email, session?.user.email!))
      .returning();
    console.log(updatedUser);
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const dynamic = 'force-dynamic';
