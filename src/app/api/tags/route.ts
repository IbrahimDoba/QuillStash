import { db } from "@/db";
import { posts, tags, postToTags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Query to join postToTags and tags
    const postTagRelations = await db
      .select({
        postId: postToTags.postId,
        tagName: tags.name,
      })
      .from(postToTags)
      .leftJoin(tags, eq(postToTags.tagId, tags.id));

    const tagsByPost: Record<string, string[]> = {};

    // Populate tagsByPost with tags for each post
    postTagRelations.forEach((relation) => {
      if (!tagsByPost[relation.postId]) {
        tagsByPost[relation.postId] = [];
      }
      if (relation.tagName !== null) {
        tagsByPost[relation.postId].push(relation.tagName);
      }
    });

    return NextResponse.json(tagsByPost, { status: 200 });
  } catch (err) {
    console.error("Error fetching tags:", err);
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
