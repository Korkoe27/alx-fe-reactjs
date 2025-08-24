import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  const queryClient = useQueryClient();

  // Use React Query's useQuery hook to fetch data
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isFetching,
    isRefetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  // Handle manual refetch
  const handleRefetch = () => {
    refetch();
  };

  // Handle invalidating cache and refetching
  const handleInvalidateAndRefetch = () => {
    queryClient.invalidateQueries(['posts']);
  };

  // Handle clearing cache
  const handleClearCache = () => {
    queryClient.removeQueries(['posts']);
  };

  // Loading state
  if (isLoading) {
    return (
      <div>
        <h2>Posts from JSONPlaceholder API</h2>
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <h2>Posts from JSONPlaceholder API</h2>
        <p>Error fetching posts: {error.message}</p>
        <button onClick={handleRefetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Posts from JSONPlaceholder API</h2>
      
      {/* Control buttons to demonstrate React Query features */}
      <div>
        <button onClick={handleRefetch} disabled={isRefetching}>
          {isRefetching ? 'Refetching...' : 'Refetch Data'}
        </button>
        
        <button onClick={handleInvalidateAndRefetch}>
          Invalidate & Refetch
        </button>
        
        <button onClick={handleClearCache}>
          Clear Cache
        </button>
        
        {isFetching && !isRefetching && (
          <span> (Background fetching...)</span>
        )}
      </div>

      {/* Display cache status information */}
      <div>
        <p>
          <strong>Cache Status:</strong> Data is cached and will be considered fresh for 5 minutes.
          Navigate away and come back to see caching in action!
        </p>
        <p>
          <strong>Network Status:</strong> {isFetching ? 'Fetching data...' : 'Idle'}
        </p>
      </div>

      {/* Display posts */}
      <div>
        <h3>Posts ({posts?.length || 0} total)</h3>
        <div>
          {posts?.slice(0, 10).map(post => (
            <div key={post.id}>
              <h4>{post.id}. {post.title}</h4>
              <p>{post.body}</p>
              <hr />
            </div>
          ))}
          {posts?.length > 10 && (
            <p><em>Showing first 10 posts of {posts.length} total posts...</em></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostsComponent;