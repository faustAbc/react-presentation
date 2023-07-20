import { Loader } from "@/components/common/Loader";
import { Posts } from "@/components/common/Posts";
import axios from "axios";
import { useState } from "react";

export const FetchByButton = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");

    setIsLoading(false);
    setPosts(posts.data);
  };

  return (
    <>
      <button onClick={loadData}>Load posts</button>
      {isLoading && <Loader />}
      <Posts posts={posts} />
    </>
  );
};
