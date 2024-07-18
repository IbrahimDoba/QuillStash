import axios from "axios";
import { ObjectId } from "mongoose";

export interface postProps {
  _id : string;
  tags: [string],
  title: string;
  index:string;
  createdAt:string
  body: string;
  coverImage:string;
  featured: boolean;
  userInfo: {
    username:string;
    userImage:string | any;
    role: string;
    author:string;
  }
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