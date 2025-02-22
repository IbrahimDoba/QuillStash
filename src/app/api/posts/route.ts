import { db } from '@/db';
import { posts } from '@/db/schema';
import getSession from '@/lib/getSession';
import { generateSlug } from '@/lib/service';
import { postSchema } from '@/lib/zod';
import { notifyServer } from '@/utils/notify-server';
import { insertTags } from '@/utils/insert-tags';
import { validateRequest } from '@/utils/validateRequest';
import { sql } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';
import { generateDescription } from '@/utils/generate-description';
import { generateOgImageUrl } from '@/lib/verify-og';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');

  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 2;
  const skip = (page - 1) * limit;

  // 3 posts per page

  try {
    // Count total posts
    const [{ count }] = await db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(posts);

    const totalPosts = Number(count);
    const totalPages = Math.ceil(totalPosts / limit);
    console.log('test');

    const fetchedPosts = await db.query.posts.findMany({
      limit: limit,
      offset: skip,
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      where: (posts, { eq }) => eq(posts.published, true),
      with: {
        author: {
          columns: {
            name: true,
            image: true,
            username: true,
          },
        },
      },
    });

    const nextPage = page < totalPages ? page + 1 : null;
    const hasNextPage = page < totalPages;

    return NextResponse.json(
      {
        posts: fetchedPosts,
        nextPage,
        totalPages,
        hasNextPage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
};

export async function POST(req: Request) {
  await validateRequest();
  const session = await getSession();
  const user = session?.user;

  try {
    const requestBody = await req.json();
    const validatedData = postSchema.parse(requestBody);

    const ogImageUrl = validatedData.coverImage || generateOgImageUrl({
      name: user?.name || "",
      title: validatedData.title,
    });
    
    let postSummary = validatedData.summary;

    if (!postSummary ||postSummary.trim() === "" || postSummary === null) {
      try {
        // Generate description using Gemini if not provided
        postSummary = await generateDescription(validatedData.title);
      } catch (error) {
        console.error('Error generating description:', error);
        postSummary = null; 
      }
      // console.log(postSummary)
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        ...validatedData,
        summary: postSummary,
        slug: generateSlug(validatedData.title),
        userId: user?.id!,
        coverImage: ogImageUrl,
      })
      .returning();

    // Insert tags
    if (validatedData.tags && validatedData.tags.length > 0) {
      try {
        await insertTags(newPost.id, validatedData.tags);
      } catch (tagError) {
        console.error('Error inserting tags:', tagError);
        
      }
    }

    // Ping the discord server
    notifyServer({
      username: user?.username!,
      author: user?.name!,
      title: newPost.title,
      slug: newPost.slug,
    }).catch((error) => console.error('Failed to send notification:', error));

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
