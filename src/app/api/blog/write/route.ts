import { connectDb } from "@/lib/ConnetctDB";

import getSession from "@/lib/getSession";
import { NextRequest, NextResponse } from "next/server";
import {  generateSlug } from "@/lib/service";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { insertTags } from "@/utils/insertTags";

export const POST = async (req: NextRequest, res: any) => {
  const session = await getSession(); // Get the current user session

  try {
    const formData = await req.json();
    const { title, body, tags, coverImageUrl } = formData;

    if (!coverImageUrl) {
      return NextResponse.json(
        { error: "Cover image is required." },
        { status: 400 }
      );
    }

    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Fetch the user from the database using the session's email
    const user = await db.select()
      .from(users)
      .where(eq(users.email, session.user?.email!))
      .limit(1)
      .then((result) => result[0]);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate slug from the title
    const slugTitle = `${generateSlug(title!)}`;

    // Insert the new post into the database
    const newPost = {
      title,
      coverImage: coverImageUrl,
      body,
      tags,
      slug: slugTitle,
      userId: user.id,
    };

    // Insert the post into the posts table
   const [createdPost] = await db.insert(posts).values(newPost).returning();

   await insertTags (createdPost.id,createdPost.tags)
 

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// export const POST = async (req: NextRequest, res: any) => {
//   const session = await getSession(); // Implement this function to get the current user

//   try {
//     const formData = await req.json();
//     console.log(formData);
    
//     const title = formData.title
//     const body = formData.body;
//     const tags = formData.tags
//     const coverImageUrl = formData.coverImageUrl;
  

//     const stringifyTags = JSON.stringify(tags);
//     const parsedTags = JSON.parse(stringifyTags)
//     console.log(parsedTags)

//     if (!coverImageUrl) {
//       return NextResponse.json(
//         { error: "Cover image is required." },
//         { status: 400 }
//       );
//     }



//     await connectDb();
//     if (!session) {
//       return NextResponse.json(
//         { message: "User not authenticated" },
//         { status: 401 }
//       );
//     }
//     // console.log(session);

//     const user = await User.findOne({ email: session.user?.email });
//     // console.log(user)
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//      // Remove special characters from the title
//      const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '');
//      const slugTitle = `${sanitizedTitle}${generateRandomString(3)}`;

//     const newPost = new Post({
//       title: title,
//       coverImage: coverImageUrl, // Save the final file path
//       body: body,
//       tags: parsedTags,
//       slug: slugTitle,
//       userInfo: {
//         username: user.username,
//         userImage: user.image,
//         author: user.name,
//         role: user.role,
//         authorId: user._id,
//       },
//     });
//     // console.log(newPost);

//     const savePost = await newPost.save();

//     await User.findByIdAndUpdate(user._id, {
//       $push: { posts: newPost._id },
//     });

//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };
export const dynamic = 'force-dynamic';