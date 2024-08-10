import { Avatar } from '@nextui-org/avatar';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const TopWriters = () => {
  return (
    <div className='p-4 rounded  max-lg:hidden'>
      <h2 className='text-xl font-semibold mb-4'>Top Writers</h2>
      <ul>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className='flex gap-2 items-center mb-3'>
            <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d'/>
            <span className='text-sm'>Jason Hughes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopWriters;
