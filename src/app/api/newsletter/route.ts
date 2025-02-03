import { NextResponse } from "next/server";
import { db } from "@/db"; // Your DrizzleORM database instance
import { newsletterSubscribers } from "@/db/schema"; // Your schema
import { Resend } from "resend";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Check if email already exists
    const existingSubscriber = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .execute();

    if (existingSubscriber.length > 0) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Save email to Neon DB
    await db.insert(newsletterSubscribers).values({
      id: crypto.randomUUID(),
      email,
    });

    // Add email to Resend audience
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_KEY!, // Your Resend audience ID
    });

    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}