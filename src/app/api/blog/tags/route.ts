import { db } from "@/db";
import { posts, tags, postTags } from "@/db/schema"; // Make sure to import your schema
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Then, attempt to join postTags and tags to get the result
    const postTagRelations = await db
      .select({
        postId: postTags.postId,
        tagName: tags.name,
      })
      .from(postTags)
      .leftJoin(tags, eq(postTags.tagId, tags.id));

    const tagsByPost: Record<string, string[]> = {};

    // Populate tagsByPost with tags for each post
    postTagRelations.forEach((relation) => {
      if (!tagsByPost[relation.postId]) {
        tagsByPost[relation.postId] = [];
      }
      // Only add the tag if it's not null
      if (relation.tagName !== null) {
        tagsByPost[relation.postId].push(relation.tagName);
      }
    });

    // console.log(tagsByPost);

    return new Response(JSON.stringify(tagsByPost), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching popular tags:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// // FOR DEBBUGING
//   // Fetch all post-tag relationships first
//   const postTagsData = await db.select().from(postTags);
//   console.log("Post-Tag Relations:", postTagsData);

//   // Fetch all tags separately
//   const tagsData = await db.select().from(tags);
//   console.log("Tags Data:", tagsData);

//   const tagIdsInPostTags = postTagsData.map((pt) => pt.tagId);
//   const tagIdsInTags = tagsData.map((t) => t.id);

//   console.log("Tag IDs in postTags:", tagIdsInPostTags);
//   console.log("Tag IDs in tags:", tagIdsInTags);
