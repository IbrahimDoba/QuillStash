// pages/api/auth/signup.ts

import { db } from "@/db";
import { users, accounts, sessions } from "@/db/schema";
import { generateDisplayName, generateUsername } from "@/lib/service";
import { saltAndHashPassword } from "@/utils/password";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import crypto from "crypto";
import { AdapterAccount } from "next-auth/adapters";

export const POST = async (req: Request) => {
  try {
    const { body } = await req.json();
  

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });

    if (existingUser) {
   
      return NextResponse.json({ error: "User already exists" });
    }

    // Hash password and create a new user
    const pwHash = await saltAndHashPassword(body.password);
    const username = generateUsername(body.email);
    const name = generateDisplayName();


    const [newUser] = await db
      .insert(users)
      .values({
        email: body.email,
        password: pwHash,
        username: username,
        name: name,
        image: `https://avatar.vercel.sh/${name}?size=30`,
      })
      .returning();

    // Create an account for the user
    await db.insert(accounts).values({
      userId: newUser.id,
      type: "credentials" as AdapterAccount["type"],
      provider: "credentials",
      providerAccountId: newUser.id,
    });

    // Create a session for the user
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

    await db.insert(sessions).values({
      sessionToken,
      userId: newUser.id,
      expires: sessionExpiry,
    });

    return NextResponse.json({
      user: newUser,
      session: {
        sessionToken,
        userId: newUser.id,
        expires: sessionExpiry,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid input data" });
    }
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
};
