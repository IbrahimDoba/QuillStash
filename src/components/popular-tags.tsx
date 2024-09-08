import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import Link from 'next/link';

const PopularTags = async () => {
  const tags = await db.query.tags.findMany({
    limit: 8,
  });

  if (!tags) return null;

  return (
    <div className='p-4'>
      <h3 className='text-lg font-semibold mb-4 tracking-tight'>
        Popular Topics
      </h3>
      <ul className='flex gap-2 flex-wrap'>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.slug}`}>
              <Chip size='md'>
                {tag.name}
              </Chip>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTags;
