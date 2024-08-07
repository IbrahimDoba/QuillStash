import { connectDb } from "@/lib/ConnetctDB";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    // Ensure that page and limit are valid strings before parsing
    const page = pageParam ? parseInt(pageParam) : 1;
    const limit = limitParam ? parseInt(limitParam) : 5;
    const skip = (page - 1) * limit;

    try {
        const totalPosts = await Post.countDocuments();
        const posts = await Post.find()
            .sort({ createdAt: -1 })  // Sort by creation date in descending order
            .skip(skip)
            .limit(limit);

        const response = {
            totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            posts
        };

        return NextResponse.json(response);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
};
