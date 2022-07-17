export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  userId: number;
  groupId: number;
  tagId: number;
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
