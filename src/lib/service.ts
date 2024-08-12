import axios from "axios";
import { ObjectId } from "mongoose";
import { nanoid } from 'nanoid';

export const generateRandomString = (length: any) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function generateSlug(title: string) {
  const slug = title
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // convert all alphabets to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-_]/g, "") // Remove all non-alphanumeric characters except hyphens and underscores
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

  const randomString = nanoid(5); 
  return `${slug}-${randomString}`;
}
export function generateUsername(name: string) {
  const username = name
    .trim() // Remove leading and trailing spaces
    .toLowerCase() // Convert all alphabets to lowercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9-_]/g, "") // Remove all non-alphanumeric characters except hyphens and underscores
    .replace(/_+/g, "_"); // Replace multiple underscores with a single underscore

  const randomString = nanoid(3); 
  return `${username}_${randomString}`;
}

export interface PostProps {
  _id: string;
  tags: [string];
  slug: string;
  title: string;
  index: string;
  createdAt: string;
  body: string;
  comments: [];
  likes: any[];
  bookmarks: any[];
  coverImage: string;
  featured: boolean;
  userInfo: {
    authorId: string;
    username: string;
    userImage: string | any;
    role: string;
    author: string;
  };
}

export interface UserProps {
  _id: ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  posts: any[];
  followers: any[];
  following: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface UserProfileProps {
  _id: string;
  username: string;
  name: string;
  bio: string;
  location: string;
  createdAt: string;
  email: string;
  github: string;
  pronouns: string;
  work: string;
  posts: Array<{
    _id: string;
    title: string;
    coverImage: string;
    createdAt: string;
  }>;
}

export interface CommentProps {
  _id: string;
  body: string;
  likes: any;
  createdAt: string;
  userInfo: {
    username: string;
    userImage: string | any;
    role: string;
    author: string;
    authorId: string;
  };
  replies?: CommentProps[];
}
