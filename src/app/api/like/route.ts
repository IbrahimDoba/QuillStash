// pages/api/likes.ts
import { NextApiRequest, NextApiResponse } from "next";
import { likes } from "@/db/schema";
import { db } from "@/db";
import { NextResponse } from "next/server";
import { count, eq } from "drizzle-orm";

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === "POST") {
    const { postId, userId } = await req.json();
    console.log(postId, userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Please sign in to like a post" },
        { status: 401 }
      );
    }

    try {
      await db.insert(likes).values({
        postId,
        userId,
      });
      console.log("liked", likes);

      return NextResponse.json({ message: "Like added successfully" });
    } catch (error) {
      console.error("Error adding like:", error);
      return NextResponse.json({ message: "Error adding like" });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  console.log(postId)
  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
    const likesCount = await db
      .select({ value: count() })
      .from(likes)
      .where(eq(likes.postId, postId));

    return NextResponse.json({ likesCount: likesCount[0].value });
  } catch (error) {
    console.error("Error fetching likes count:", error);
    return NextResponse.json(
      { message: "Error fetching likes count" },
      { status: 500 }
    );
  }
}
