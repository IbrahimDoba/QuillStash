"use client";
import React, { useEffect, useState } from "react";
import PostlistCard from "@/components/blogs/postListCard";
import { useParams } from "next/navigation";
import { usePagination } from "@/context/paginationContext";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentPage, setCurrentPage, totalPages, setTotalPages } =
    usePagination();

  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `/api/blog/tags/${tag}?page=${currentPage}&limit=5`
          );
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setPosts(data.tagPosts);
          } else {
            setError(data.message || "Error fetching posts");
          }
        } catch (error) {
          setError("Error fetching posts");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [tag]);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <PostlistCard
        posts={posts}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handlePageClick={handlePageClick}
      />{" "}
    </div>
  );
};

export default Page;
