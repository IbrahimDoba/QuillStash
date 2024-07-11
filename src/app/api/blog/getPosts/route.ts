import { connectDb } from "@/lib/ConnetctDB"
import Post from "@/models/Post"
import { NextResponse } from "next/server"



export const GET = async () => {
    await connectDb()

    try{
        const posts = await Post.find()
        console.log(posts)
        return NextResponse.json(posts, )
    } catch (error){
        console.log(error)
        return NextResponse.json({message: 'server error'})
    }
}