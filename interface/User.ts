import mongoose, {ObjectId} from "mongoose";
import { Tweet } from "./Tweets";

export interface IUser {
  _id:String;
  email: string;
  firstName: string;
  profileImageURL?: string;
  followers: String[];
  following: String[];
  createdAt?: Date;
  role?: string;
}

export interface ProfileUser {
  _id: string;
  firstName: string,
  email: string,
  profileImageURL: string,
  coverPhoto: string,
  bio:string,
  location:string,
  website:string,
  createdAt: string,
  followers: String[],
  following: String[],
  posts: Tweet[],
}