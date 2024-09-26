"use server";

import { db } from '@/db';
import { confirmSchema, ConfirmValues } from '@/lib/zod';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { validateRequest } from '@/utils/validateRequest';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from "next/server";

export const confirmUsername = async (data: ConfirmValues) => {
    console.log("Received data:", data);
   await validateRequest();
   const session = await getSession();
   const user = session?.user;

   if (!user || !user.id) {
     throw new Error("User not authenticated");
   }

   try {
    const values = confirmSchema.parse(data);
    console.log(values);
//  Find the user by ID
   const userToUpdate = await db.query.users.findFirst({
     where: eq(users.id, user.id)
   });
   console.log(userToUpdate)
   if (!userToUpdate) {
     throw new Error("User not found");
   }

   const plainUserToUpdate = { ...userToUpdate }; // Ensure this is a plain object

   if (!plainUserToUpdate) {
     throw new Error("User not found");
   }

   // Update the user
   await db.update(users).set({
     ...values,
     username:values.username.trim().toLowerCase(),
     usernameConfirmed: new Date()
   }).where(eq(users.id, user.id));
   
   return { success: true, username: values.username };

  } 
   catch (err) {
    console.error("Validation failed", err);
    // throw new Error("Invalid input data");
  }
   //
}