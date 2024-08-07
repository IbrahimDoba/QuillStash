import { connectDb } from "@/lib/ConnetctDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req:NextRequest) => {

  const session = await getServerSession(); // Implement this function to get the current user
    try {

        
    await connectDb();
    if (!session) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user?.email });
    // console.log(user)
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user)
    } catch (err){
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
export const dynamic = 'force-dynamic';