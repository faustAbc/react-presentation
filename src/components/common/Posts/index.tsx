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

export const Posts: FC<PostsProps> = ({ posts }) => (
  <dl className="max-w-md divide-y  text-white divide-gray-700">
    {posts.map((post) => (
      <div className="flex flex-col pb-3" key={post.id}>
        <span className="mb-1 md:text-lg text-gray-400">{post.title}</span>
        <span className="text-lg font-semibold">{post.body}</span>
      </div>
    ))}
  </dl>
);
