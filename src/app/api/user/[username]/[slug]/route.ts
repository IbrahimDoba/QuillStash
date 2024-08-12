import { connectDb } from "@/lib/ConnetctDB";
import User from "@/models/User";
import Post from "@/models/Post";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/getSession";

export const GET = async (
  req: NextRequest,
  { params }: { params: { username: string; slug: string } }
) => {
  await connectDb();

  const { username, slug } = params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const post = await Post.findOne({ slug, "userInfo.authorId": user._id });
    if (!post) {
      return NextResponse.json({ message: "Post not found" });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { username: string; slug: string } }
) => {
  await connectDb();

  const { username, slug } = params;
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // const { title, body, tags, coverImageUrl } = req.json();
  const Data = await req.json();
  console.log(Data);
  const title = Data.title;
  const body = Data.body;
  const tags = Data.tags;
  const coverImageUrl = Data.coverImageUrl;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const post = await Post.findOne({ slug, "userInfo.authorId": user._id });
    if (!post) {
      return NextResponse.json({ message: "Post not found" });
    }

    // if (post.userInfo.authorId.toString() !== session.user.id) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    post.title = title;
    post.body = body;
    post.tags = tags;
    post.coverImage = coverImageUrl;

    await post.save();

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { username: string; slug: string } }
) => {
  await connectDb();

  const { username, slug } = params;
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const DeletePost = await Post.findOneAndDelete({ slug, "userInfo.authorId": user._id });
    if (!DeletePost) {
      return NextResponse.json({ message: "Post not found" });
    }
    return NextResponse.json(DeletePost);
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' });
  }
};
export const dynamic = 'force-dynamic';