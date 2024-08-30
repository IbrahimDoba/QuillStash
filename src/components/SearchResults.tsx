import Link from "next/link";
import React from "react";

interface Post {
  id: number;
  title: string;
  tags: string[];
  username: string;
  slug: string;
}

interface SearchResultsProps {
  results: Post[];
}

function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="absolute z-10 w-full bg-white dark:bg-gray-800 mt-1 rounded-md shadow-lg">
      {results.map((post) => (
        <div
          key={post.id}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Link href={`/${post.username}/${post.slug}`}>
            <h3 className="text-sm font-medium">{post.title}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 dark:bg-gray-600 rounded-full px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
