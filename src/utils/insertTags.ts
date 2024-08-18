import { db } from "@/db";
import { posts, postsTags, tags } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function insertTags(postId: string, tagNames: string[]) {
  try {
    return await db.transaction(async (tx) => {
      // Insert the post

      // Process each tag
      for (const tagName of tagNames) {
        // Try to find the tag
        let [tag] = await tx.select().from(tags).where(eq(tags.name, tagName));

        // If the tag doesn't exist, create it
        if (!tag) {
          [tag] = await tx.insert(tags).values({ name: tagName }).returning();
        }

        // Create the association
        await tx.insert(postsTags).values({
          postId,
          tagId: tag.id,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
