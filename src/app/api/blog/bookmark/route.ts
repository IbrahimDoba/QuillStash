import { connectDb } from "@/lib/ConnetctDB";
import Comment from "@/models/Comments";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/getSession";
import Post from "@/models/Post";
import { NextApiRequest } from "next";

export const POST = async (req: NextRequest) => {
  const session = await getSession(); // Implement this function to get the current user

  try {
    const { bookmarkId } = await req.json();
    connectDb();

    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const post = await Post.findById(bookmarkId);
    if (!post) {
      return NextResponse.json(
        { message: "bookmark not found" },
        { status: 404 }
      );
    }
    const updateBookmarkToUser = user.bookmarks.includes(post._id);
    if (updateBookmarkToUser) {
      user.bookmarks.pull(post._id);
      // user.likes.pull(post._id);
    } else {
      user.bookmarks.push(post._id);
      // user.likes.push(post._id);
    } 
    console.log("test",post.bookmarks)
    await user.save()
    return NextResponse.json({ bookmarks: user.bookmarks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
};


export const GET = async (req: NextRequest) => {
  await connectDb();

  const session = await getSession(); // Implement this function to get the current user

  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const user = await User.findOne({ email: session.user?.email }).populate(
    "bookmarks"
  );
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 5;
  const skip = (page - 1) * limit;

  try {
    const totalBookmarks = user.bookmarks.length;
    const paginatedBookmarks = user.bookmarks.slice(skip, skip + limit);

    const response = {
      bookmarks: paginatedBookmarks,
      totalPages: Math.ceil(totalBookmarks / limit),
      currentPage: page,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server error" });
  }
};

export const dynamic = 'force-dynamic';