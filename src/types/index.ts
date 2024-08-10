export type Post = {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  slug: string;
  coverImage: string;
  userInfo: PostAuthor;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  likes: string[];
  comments: [];
  bookmarks: [];
  views: number;
};

export type PostAuthor = {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  posts: any[];
  bio: string;
  github: string;
  followers: any[];
  following: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
