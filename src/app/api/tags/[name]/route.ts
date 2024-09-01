import { db } from '@/db';
import { posts } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (req: NextRequest, {params} : {params: {name:string}}) => {
  const {name} = params
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

    // Fetch paginated posts
    // const fetchedPosts = await db
    //   .select()
    //   .from(posts)
    //   .orderBy(desc(posts.createdAt))
    //   .limit(limit)
    //   .offset(skip);
    // console.log(fetchedPosts)


    const fetchedPosts = await db.query.posts.findMany({
      limit: limit,
      offset: skip,
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      where: (posts) => 
        sql`${posts.tags}::jsonb @> ${sql`${JSON.stringify([name])}`}::jsonb`,
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
