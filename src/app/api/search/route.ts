import { searchPosts, searchTags, searchUsers } from '@/utils/search';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async ( req: NextRequest ) => {

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query || query.trim() === '') {
    return NextResponse.json(
      { message: 'Invalid or missing search query' },
      { status: 400 }
    );
  }

  try {
    const [posts, tags, users] = await Promise.all([
      searchPosts(query),
      searchTags(query),
      searchUsers(query),
    ]);

    console.log('Search results:', { posts, tags, users });

    return NextResponse.json(
      {
        posts,
        tags,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ message: 'server error' }, { status: 500 });
  }
}
