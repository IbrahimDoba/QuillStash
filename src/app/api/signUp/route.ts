import { connectDb } from "@/lib/ConnetctDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (request: any) => {
  const formData = await request.json();
  console.log(formData)

  const username = formData.username;
  const email = formData.email;
  const password = formData.password;
  const name = formData.name;
  const profileImage = formData.profileImage;

  console.log("signuptest", profileImage);

  // const finalUserFilePath = await uploadFile(profileImage);
  // console.log(finalUserFilePath);
 
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(username, email, hashedPassword, profileImage);

  try {
    await connectDb();

    const existingEmail = await User.findOne({ email });
    const existingUser = await User.findOne({ username });
  
    if (existingEmail) {
      return new NextResponse("Email or username is already in use", {
        status: 400,
      });
    }


    await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      image: profileImage,
    });

    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
