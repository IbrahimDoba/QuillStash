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
  password: string | null; // Update if password can be null
  image: string | null; // Update if image can be null
  role: string | null; // Update if role can be null
  posts: any[];
  bio: string | null; // Update if bio can be null
  github: string | null; // Update if github can be null
  followers: any[];
  following: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};