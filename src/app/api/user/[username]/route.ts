import { connectDb } from '@/lib/ConnetctDB';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export const  GET =async (req: NextApiRequest, { params }: { params: { username: string }}) => {
  await connectDb();

  const  username  = params.username
  if (req.method === 'GET') {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json({ message: 'User not found' });
      }
    return  NextResponse.json(user);
    } catch (error) {
     return NextResponse.json({ message: 'Internal server error' });
    }
  }}

  export const  PUT = async (req: NextApiRequest, { params }: { params: { username: string }}) => {
    try {
        const  username  = params.username

      const { name, bio, location, pronouns, work, github } = req.body;
      const user = await User.findOneAndUpdate(
        { username },
        { name, bio, location, pronouns, work, github },
        { new: true }
      );
      if (!user) {
        return NextResponse.json({ message: 'User not found' });
      }
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json({ message: 'Internal server error' });
    }
  }

