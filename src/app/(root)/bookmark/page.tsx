"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PostProps } from '@/lib/service'; // Import the type definition for posts
import PostlistCard from '@/components/blogs/postListCard';
import { usePagination } from '@/context/paginationContext';

const BookmarksPage = () => {
  
  const [bookmarks, setBookmarks] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`/api/blog/bookmark?page=${currentPage}&limit=5`); // Adjust the API endpoint as needed
        setBookmarks(response.data.bookmarks);
        console.log(response)
      } catch (error) {
        setError('Failed to fetch bookmarks');
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div>Loading bookmarks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Bookmarked Posts</h1>
      <div className="flex flex-col min-h-screen justify-start items-center space-y-4">
      <PostlistCard
              posts={bookmarks}
              loading={loading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handlePageClick={handlePageClick}
            />{" "}
                  </div>
    </div>
  );
};

export default BookmarksPage;
