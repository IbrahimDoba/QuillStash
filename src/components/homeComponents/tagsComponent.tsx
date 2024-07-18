"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

const TagsComponent = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/blog/tags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div>
      <div className="col-span-3 bg-white p-4 rounded shadow min-w-[240px]">
        <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
        <ul>
          {tags.map(tag => (
            <li key={tag} className="mb-2">
              <Link   className="text-gray-700 hover:underline px-2 py-1 rounded-md active:bg-gray-200" href={`/tags/${tag}`}>
               
                  #{tag}
                
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsComponent;
