import { connectDb } from "@/lib/ConnetctDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async (req:Request) => {

    try {

        
    await connectDb();
    const session = await getServerSession(); // Implement this function to get the current user
    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user?.email });
    console.log(user)
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user)
    } catch (err){
        console.log(err)
    }
}