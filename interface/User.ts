import mongoose from "mongoose";
import { Tweet } from "./Tweets";

export interface IUser {
  _id:String;
  email: string;
  firstName: string;
  // lastName: string;
  profileImageURL?: string;
  posts: {
    content: string;
    image: string[];
    likes: number;
    views: number;
  }[];
  comments: string[];
  followers: mongoose.Schema.Types.ObjectId[];
  following: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  role?: string;
}

export interface ProfileUser {
  userId: string,
  firstName: string,
  email: string,
  profileImageURL: string,
  createdAt: string,
  followers: IUser[],
  following: IUser[],
  posts: Tweet[],
}