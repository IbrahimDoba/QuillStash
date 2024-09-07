import { Avatar } from '@nextui-org/react';
import React from 'react';
import { db } from '@/db';
import { users, posts } from '@/db/schema';
import Link from 'next/link';
import { desc, eq, sum } from 'drizzle-orm';

const TopWriters = async () => {
  // Fetch all users with their posts and sum of views
  const usersWithViews = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      image: users.image,
      totalViews: sum(posts.views).as('totalViews'),
    })
    .from(users)
    .innerJoin(posts, eq(users.id, posts.userId))
    .groupBy(users.id, users.name, users.username, users.image)
    .orderBy(desc(sum(posts.views)))
    .limit(5);

  if (!usersWithViews.length) return null;

  return (
    <div className='p-4 rounded max-lg:hidden'>
      <h2 className='text-lg font-semibold mb-4 tracking-tight'>Top Writers</h2>
      <ul className='flex flex-col gap-2.5'>
        {usersWithViews.map((writer) => (
          <li key={writer.id}>
            <Link href={`/${writer.username}`} className='flex gap-2 items-center'>
              <Avatar src={writer.image ?? '/user-1.png'} size='sm' />
              <span className='text-sm'>{writer.name}</span>
              <span className='text-xs text-gray-500'>
                ({writer.totalViews ?? 0} views)
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopWriters;