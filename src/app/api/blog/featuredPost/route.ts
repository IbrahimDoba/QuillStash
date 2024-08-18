// import { connectDb } from "@/lib/ConnetctDB"
// import Post from "@/models/Post"
// import { NextResponse } from "next/server"



// export const GET = async () => {
//     await connectDb()
//     try{
//         const Featuredposts = await Post.find({featured: true})
//         // console.log(Featuredposts)
//         return NextResponse.json(Featuredposts, )
//     } catch (error){
//         console.log(error)
//         return NextResponse.json({message: 'server error'})
//     }
// }