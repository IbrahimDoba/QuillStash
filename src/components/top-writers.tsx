import { Avatar } from '@nextui-org/react';
import React from 'react';
import { db } from '@/db';
import Link from 'next/link';

const TopWriters = async () => {
  const writers = await db.query.users.findMany({});

  if (!writers) return null;

  return (
    <div className='p-4 rounded  max-lg:hidden'>
      <h2 className='text-lg font-semibold mb-4 tracking-tight'>Top Writers</h2>
      <ul className='flex flex-col gap-2.5'>
        {writers.map((writer) => (
          <li key={writer.id}>
            <Link href={`/${writer.username}`} className='flex gap-2 items-center'>
              <Avatar src={writer.image ?? '/user-1.jpg'} size='sm' />
              <span className='text-sm'>{writer.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopWriters;
