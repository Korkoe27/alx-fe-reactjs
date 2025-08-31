// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

// fetcher function
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const PostsComponent = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    refetch, // 👈 get refetch function
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => refetch()}>Refetch Posts</button> {/* ✅ button + onClick */}
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;