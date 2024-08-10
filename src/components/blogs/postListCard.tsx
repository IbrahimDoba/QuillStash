"use client";
import Image from "next/image";
import React from "react";
import { BiComment } from "react-icons/bi";
import { CgUser } from "react-icons/cg";
import TruncatedText from "@/lib/truncatedText";
import Link from "next/link";
import { PostProps } from "@/lib/service";

interface PostlistCardProps {
  posts: PostProps[];
  loading: boolean;
  error: string;
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageClick: (pageNumber: number) => void;
}

const PostlistCard: React.FC<PostlistCardProps> = ({
  posts, loading, error, currentPage, totalPages, handleNextPage, handlePrevPage, handlePageClick
}) => {

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="rounded-xl overflow-hidden ">
      {posts.map(post => (
        <div key={post._id} className="md:flex p-4 flex my-8 border items-center justify-around border-gray-300 rounded-lg shadow-lg">
          <div className="md:flex-shrink-0 w-[30%]">
            <Image
              className="h-56 w-full object-cover rounded-xl"
              loader={() => post.coverImage}
              src={post.coverImage}
              alt="Dev Community"
              width={400}
              height={300}
            />
          </div>
          <div className="p-8 w-[70%]">
            <Link href={`/${post.userInfo.username}`}>
              <div className="flex mr-8">
                <div>
                  <Image
                    src={post.userInfo.userImage || <CgUser className="mr-4" size={30}/>}
                    alt="User"
                    width={70}
                    height={70}
                    className="w-12 h-12 mr-4 rounded-full cursor-pointer"
                  />
                </div>
                <div>
                  <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {post.userInfo.author}
                  </h2>
                  <small className="mt-2 text-gray-800 text-sm">{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </Link>
            <div className="ml-[15%]">
              <Link href={`/${post.userInfo.username}/${post.slug}`}>
                <p className="mt-2 font-extrabold text-gray-800 text-3xl">
                  {post.title}
                </p>
                <div>
                  <TruncatedText content={post.body} maxLength={100} />
                </div>
                <div className="flex space-x-3">
                  {post.tags && post.tags.map((tag, index) => (
                    <p
                      key={index}
                      className="block mt-4 text-lg leading-tight font-medium text-blue-500 hover:underline"
                    >
                      #{tag}
                    </p>
                  ))}
                </div>
                <p className="mt-2 text-gray-500 flex items-center">
                  <BiComment className="mr-2" />
                  Comment
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"} `}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === pageNumber ? "bg-blue-700 text-white" : "bg-blue-500 text-white"} `}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"} `}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostlistCard;
