import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { tag: string } }) => {
  try {
    await connectDb();
    
    const tag = params.tag;
    const tagPosts = await Post.find({ tags: tag });
    
    if (!tagPosts || tagPosts.length === 0) {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }
    console.log(tagPosts)
    return NextResponse.json(tagPosts);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
