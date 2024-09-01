// // pages/api/search.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { desc, eq, or, like } from "drizzle-orm";
// import { db } from "@/db";
// import { posts, postTags, tags, users } from "@/db/schema";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (request: Request, res: NextApiResponse) => {
//   const { searchParams } = new URL(request.url);
//   const q = searchParams.get("q");

//   console.log("Search query:", q);

//   if (!q || q.trim() === "") {
//     return NextResponse.json(
//       { error: "Invalid or missing search query" },
//       { status: 400 }
//     );
//   }

//   try {
//     console.log("Executing database query...");
//     const searchResults = await db
//       .select({
//         id: posts.id,
//         title: posts.title,
//         tags: tags.name,
//         username: users.username,
//         slug: posts.slug,
//       })
//       .from(posts)
//       .leftJoin(postTags, eq(posts.id, postTags.postId))
//       .leftJoin(tags, eq(postTags.tagId, tags.id))
//       .innerJoin(users, eq(posts.userId, users.id))
//       .where(or(like(posts.title, `%${q}%`), like(tags.name, `%${q}%`)))
//       .orderBy(desc(posts.createdAt))
//       .limit(10);

//     console.log("Search results:", searchResults);

//     if (searchResults.length === 0) {
//       console.log("No results found for query:", q);
//     }

//      // Group the results by post id
//      const groupedResults = searchResults.reduce((acc, current) => {
//         const { id, title, tags, username, slug } = current;
//         if (!acc[id]) {
//           acc[id] = { id, title, tags: [], username, slug };
//         }
//         if (tags && !acc[id].tags.includes(tags)) {
//           acc[id].tags.push(tags);
//         }
//         return acc;
//       }, {} as Record<number, { id: number; title: string; tags: string[]; username: string; slug: string }>);
  
//       const finalResults = Object.values(groupedResults);
//       console.log(finalResults)
//       return NextResponse.json(finalResults);
//   } catch (error) {
//     console.error("Search error:", error);
//     return NextResponse.json({ error: "An error occurred while searching" });
//   }
// };


// changes because of new schema 
import { NextApiRequest, NextApiResponse } from "next";
import { desc, eq, or, like, sql } from "drizzle-orm";
import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: Request, res: NextApiResponse) => {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  console.log("Search query:", q);

  if (!q || q.trim() === "") {
    return NextResponse.json(
      { error: "Invalid or missing search query" },
      { status: 400 }
    );
  }

  try {
    console.log("Executing database query...");
    
    // Update the search query to search within JSON array of tags and title
    const searchResults = await db
      .select({
        id: posts.id,
        title: posts.title,
        tags: posts.tags,
        username: users.username,
        slug: posts.slug,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .where(
        or(
          like(posts.title, `%${q}%`),
          sql`posts.tags::jsonb @> ${JSON.stringify([q])}::jsonb`
        )
      )
      .orderBy(desc(posts.createdAt))
      .limit(10);

    console.log("Search results:", searchResults);

    if (searchResults.length === 0) {
      console.log("No results found for query:", q);
    }

    // Transform the results to match the expected output
    const finalResults = searchResults.map(result => ({
      id: result.id,
      title: result.title,
      tags: result.tags, // This is already an array
      username: result.username,
      slug: result.slug
    }));

    console.log("Final grouped results:", finalResults);
    return NextResponse.json(finalResults);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "An error occurred while searching" });
  }
};
