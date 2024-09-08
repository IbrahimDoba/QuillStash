"use server";

import { db } from '@/db';
import { confirmSchema, ConfirmValues } from '@/lib/zod';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { validateRequest } from '@/utils/validateRequest';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export const confirmUsername = async (data: ConfirmValues) => {
   await validateRequest();
   const session = await getSession();
   const user = session?.user;

   if (!user || !user.id) {
     throw new Error("User not authenticated");
   }

   const values = confirmSchema.parse(data);

   // Find the user by ID
   const userToUpdate = await db.query.users.findFirst({
     where: eq(users.id, user.id)
   });

   if (!userToUpdate) {
     throw new Error("User not found");
   }

   // Update the user
   await db.update(users).set({
     ...values,
     usernameConfirmed: new Date()
   }).where(eq(users.id, user.id));

   return redirect(`/${values.username}`);
}