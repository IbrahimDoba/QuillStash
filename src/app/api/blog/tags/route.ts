import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

interface PostType {
  tags: string[];
}

export const GET = async (req: NextRequest) => {
  try {
    await connectDb();

    const posts = await Post.find({}) as PostType[];
    
    const tagCount: { [key: string]: number } = {};

    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (tagCount[tag]) {
          tagCount[tag]++;
        } else {
          tagCount[tag] = 1;
        }
      });
    });

    const popularTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a]).slice(0, 5);

    return NextResponse.json(popularTags);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
