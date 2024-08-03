import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/uploadHandler";
import { generateRandomString } from "@/lib/service";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: any, res: any) => {
  try {
    const formData = await req.json();
    console.log(formData);
    
    const title = formData.title
    const body = formData.body;
    const tags = formData.tags
    const coverImageUrl = formData.coverImageUrl;
  

    const stringifyTags = JSON.stringify(tags);
    const parsedTags = JSON.parse(stringifyTags)
    console.log(parsedTags)

    if (!coverImageUrl) {
      return NextResponse.json(
        { error: "Cover image is required." },
        { status: 400 }
      );
    }

    // const finalFilePath = await uploadFile(coverImage);
    // const finalbodyFilePath = await uploadFile(bodyImage);
    // console.log(finalFilePath);

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
     // Remove special characters from the title
     const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '');
     const slugTitle = `${sanitizedTitle}${generateRandomString(3)}`;

    const newPost = new Post({
      title: title,
      coverImage: coverImageUrl, // Save the final file path
      body: body,
      tags: parsedTags,
      slug: slugTitle,
      userInfo: {
        username: user.username,
        userImage: user.image,
        author: user.name,
        role: user.role,
        authorId: user._id,
      },
    });
    // console.log(newPost);

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
