import { NextApiRequest, NextApiResponse } from 'next';
// import { usersTable } from '@/db/drizzleSchema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, users } from '@/db/schema';

// export const   PUT = async(req: NextResponse,{ params }: { params: { id: string } }) => {
//     const id = parseInt(params.id)
//       const { name, age, email } = await req.json();
//     console.log(id)
//   try {
//     const result = await db.update(usersTable)
//       .set({ name, age, email })
//       .where(eq(usersTable.id, id))
//       .returning()
//     return NextResponse.json(result);
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
//   }
// }


// export  const  DELETE= async(req: NextApiRequest, { params }: { params: { id: string } }) => {
//     const id = parseInt(params.id)
//     console.log(id)

//     try {
//       const result = await db.delete(usersTable)
//       .where(eq(usersTable.id, id))
//         .returning();
//       return NextResponse.json(result);
//     } catch (error) {
//       return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
//     }
//   }
  export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const id = params.id;
  
    try {
      const user = await db.select().from(users).where(eq(users.id, id)).limit(1).execute();
      if (user.length === 0) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      return NextResponse.json(user[0]);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    }}