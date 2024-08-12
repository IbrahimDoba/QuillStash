// pages/api/insertUser.ts

import { NextApiRequest, NextApiResponse } from "next";

// import { usersTable } from "@/db/drizzleSchema";
import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import { db } from "@/db";
import getSession from "@/lib/getSession";
import { eq } from "drizzle-orm";

// export const POST = async (req: NextResponse, res: NextApiResponse) => {
//   try {
//     const { name, age, email } = await req.json();
//     console.log(name, age, email);
//     const result = await db
//       .insert(usersTable)
//       .values({ name, age, email })
//       .returning();
//     console.log(result);
//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ message: "post not working" });
//   }
// };

export const GET = async (
  req: Request,
) => {
  const session = await getSession();
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
