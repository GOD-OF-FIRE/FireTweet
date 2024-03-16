import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from backend and update state
    // Example:
    // fetch('/api/posts')
    //   .then(response => response.json())
    //   .then(data => setPosts(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Blog Posts</h1>
      <Link to="/create">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
