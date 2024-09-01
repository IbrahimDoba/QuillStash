import getSession from '@/lib/getSession';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import { db } from '@/db';

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const form = await req.formData();
    console.log("Received form data:", Object.fromEntries(form.entries()));

    const updateData: Partial<typeof users.$inferInsert> = {};
    const fields = ['name', 'bio', 'location', 'pronouns', 'work', 'github', 'image'];

    fields.forEach(field => {
      const value = form.get(field);
      if (value !== null && value !== undefined && value !== '') {
        updateData[field] = value.toString();
      }
    });

    console.log("Update data:", updateData);

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.email, session.user.email!))
      .returning();

    console.log("Updated user:", updatedUser);

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
}

export const dynamic = 'force-dynamic';