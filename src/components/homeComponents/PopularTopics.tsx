'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, Skeleton } from '@nextui-org/react';

const PopularTopics = () => {
  const getTags = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/tags`);
    const data: Record<string, string[]> = await res.json();    console.log("TAGS RESPOSNSE",data)

    // Extract all tags and remove duplicates
    const tagSet = new Set<string>();
    Object.values(data).forEach(tagsArray => {
      tagsArray.forEach(tag => tagSet.add(tag));
    });
    
    return Array.from(tagSet);
  };

  const {
    data: tags,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  if (isLoading) {
    return (
      <div className='p-4'>
        <h3 className='text-xl font-semibold mb-4'>Popular Topics</h3>
        <div className='flex gap-2 flex-wrap'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`rounded-full h-8 ${i % 2 === 0 ? 'w-12' : 'w-16'}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) return null;

  return (
    <div className='p-4'>
      <h3 className='text-xl font-semibold mb-4'>Popular Topics</h3>
      <ul className='flex gap-2 flex-wrap'>
      {tags && tags.length > 0 ? (
        tags.map((tag, index) => (
          <li key={`${tag}-${index}`}>
            <Link isBlock href={`/tags/${tag}`} color='foreground'>
              #{tag}
            </Link>
          </li>
        ))
      ) : (
        <li>No tags found</li>
      )}
      </ul>
    </div>
  );
};

export default PopularTopics;
