export type CommentReply = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  body: string;
  commentId: string;
  user: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
};

export type Comment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  body: string;
  postId: string;
  user: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
};

export interface CommentWithAuthorAndReplyWithAuthor extends Comment {
  replies: CommentReply[];
};
