import { db, users } from "@/db/schema";
import { connectDb } from "@/lib/ConnetctDB";
import User from "@/models/User";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (
  req: Request,
) => {
  const session = await getServerSession();
  console.log(session);
  const sessionEmail = session?.user.email || null

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, sessionEmail!))
      .limit(1)
      .execute();
      console.log(user)
    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user[0]);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
};


// export const GET = async (req:NextRequest) => {

//   const session = await getServerSession(); // Implement this function to get the current user
//     try {

        
//     await connectDb();
//     if (!session) {
//       return NextResponse.json(
//         { message: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const user = await User.findOne({ email: session.user?.email });
//     // console.log(user)
//     if (!user) {
//         return NextResponse.json({ message: "User not found" }, { status: 404 });
//       }
//       return NextResponse.json(user)
//     } catch (err){
//       return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }
export const dynamic = 'force-dynamic';