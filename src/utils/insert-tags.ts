import { db } from '@/db';
import { tags, postToTags } from '@/db/schema';
import { generateTagSlug } from '@/lib/service';
import { eq, and } from 'drizzle-orm';

export async function insertTags(postId: string, tagNames: string[]) {
  try {
    for (const tagName of tagNames) {
      // Try to find the tag
      let [existingTag] = await db
        .select()
        .from(tags)
        .where(eq(tags.name, tagName));

      let tagId;

      if (!existingTag) {
        // If the tag doesn't exist, create it
        const [newTag] = await db
          .insert(tags)
          .values({ name: tagName, slug: generateTagSlug(tagName) })
          .returning({ id: tags.id });
        tagId = newTag.id;
      } else {
        tagId = existingTag.id;
      }

      // Check if the post-tag relationship already exists
      const [existingRelation] = await db
        .select()
        .from(postToTags)
        .where(and(eq(postToTags.postId, postId), eq(postToTags.tagId, tagId)));

      if (!existingRelation) {
        // If the relationship doesn't exist, create it
        await db.insert(postToTags).values({
          postId,
          tagId,
        });
      }
    }
  } catch (error) {
    console.error('Error inserting tags:', error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}
