import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/uploadHandler";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: any, res: any) => {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const body = formData.get("body");
    const tags = formData.get("tags");
    const coverImage = formData.get("coverImage");
    const bodyImage = formData.get("bodyImage")

    const parsedTags = JSON.parse(tags);

    console.log(formData);

    if (!coverImage) {
      return NextResponse.json(
        { error: "Cover image is required." },
        { status: 400 }
      );
    }

    const finalFilePath = await uploadFile(coverImage);
    const finalbodyFilePath = await uploadFile(bodyImage);
    console.log(finalbodyFilePath);

    await connectDb();
    const session = await getServerSession(); // Implement this function to get the current user
    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    // console.log(session);

    const user = await User.findOne({ email: session.user?.email });
    // console.log(user)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newPost = new Post({
      title: title,
      coverImage: finalFilePath, // Save the final file path
      body: body,
      tags: parsedTags,
      bodyImage: finalbodyFilePath,
      userInfo: {
        username: user.username,
        userImage: user.image,
        author: user.name,
        role: user.role,
        authorId: user._id,
      },
    });
    console.log(newPost);

    const savePost = await newPost.save();

    await User.findByIdAndUpdate(user._id, {
      $push: { posts: newPost._id },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
