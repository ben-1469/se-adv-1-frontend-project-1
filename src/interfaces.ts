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
  user: any;
  comments: [];
  likes: [];
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  id: string;
  avatar?: string;
}

export interface Group {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
}
