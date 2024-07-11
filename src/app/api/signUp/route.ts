import { connectDb } from "@/lib/ConnetctDB";
import { uploadFile } from "@/lib/uploadHandler";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (request: any) => {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');
  const profileImage = formData.get('profileImage');

  console.log("signuptest", profileImage);

  const finalUserFilePath = await uploadFile(profileImage);
  console.log(finalUserFilePath);

 
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
      image: finalUserFilePath,
    });

    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
