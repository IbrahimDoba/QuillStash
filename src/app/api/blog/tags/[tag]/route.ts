import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { tag: string } }) => {
  try {
    await connectDb();
    
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    const page = pageParam ? parseInt(pageParam) : 1;
    const limit = limitParam ? parseInt(limitParam) : 5;
    const skip = (page - 1) * limit;

    const tag = params.tag;
    const totalTagPosts = await Post.countDocuments({ tags: tag });
    const tagPosts = await Post.find({ tags: tag }).skip(skip).limit(limit);
    
    if (!tagPosts || tagPosts.length === 0) {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }

    return NextResponse.json({
      tagPosts,
      totalPages: Math.ceil(totalTagPosts / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
