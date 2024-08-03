"use client";
import React, { useEffect, useState } from "react";
import PostlistCard from "../blogs/postListCard";
import FeaturedPostList from "../blogs/featuredPostCard";
import { PostProps } from "@/lib/service";
import axios from "axios";
import CommentContainer from "../commentComponent/CommentContainer";
import { usePagination } from "@/context/paginationContext";

const PostsComponent = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/blog/getPosts?page=${page}&limit=5`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <FeaturedPostList />
      <div className="my-6 space-y-3">
        <PostlistCard 
          posts={posts} 
          loading={loading} 
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default PostsComponent;
