import { connectDb } from "@/lib/ConnetctDB";
import User from "@/models/User";
import Post from "@/models/Post"; // Ensure you have a Post model
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, { params }: { params: { username: string, title: string } }) => {
    await connectDb();

    const { username, title } = params;

    if (req.method === 'GET') {
        try {
            const user = await User.findOne({ username });
            console.log('USER HERE',user)
            if (!user) {
                return NextResponse.json({ message: 'User not found' });
            }
                console.log(title,user._id)
            const post = await Post.findOne({ title, "userInfo.authorId": user._id })
            if (!post) {
                return NextResponse.json({ message: 'Post not found' });
            }
            console.log("POST HERE",post)
            return NextResponse.json(post);
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error' });
        }
    }
};
