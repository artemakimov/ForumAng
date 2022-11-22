import {Comment} from "../interfaces/comment.interface";

export interface Post {
    id: string;
    title: string;
    text: string;
    date: Date;
    tags: string[];
    comments: Comment[];
  }