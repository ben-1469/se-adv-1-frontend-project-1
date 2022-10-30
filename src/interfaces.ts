import { ReactNode } from 'react';

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string; // form
  content: string; // form
  published: boolean;
  viewCount: number;
  userId: number;
  groupId: number; // form
  tagId: number; // form
  group: any;
  tag: any;
  user: User;
  comments: [];
  likes: Like[];
}

export interface Like {
  commentId?: string;
  createdAt: Date;
  id: number;
  postId?: number;
  updatedAt: Date;
  userId: number;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  id: number;
  profilePic?: string;
  bio?: string;
  location?: string;
  website?: string;
  dob?: string;
}

export interface Group {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  posts: Post[];
}

export interface Mood {
  name: string;
  value: string;
  icon: any;
  iconColor: string;
  bgColor: string;
}
