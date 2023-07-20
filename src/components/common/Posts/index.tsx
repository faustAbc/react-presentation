import { FC } from "react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Posts = Post[];

interface PostsProps {
  posts: Posts;
}

export const Posts: FC<PostsProps> = ({ posts }) =>
  posts.map((post) => (
    <div key={post.id}>
      <span>{post.title}</span>
      <span>{post.body}</span>
    </div>
  ));
