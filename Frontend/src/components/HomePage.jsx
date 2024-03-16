import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getAll");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
        {posts.map((post, index) => (
          <div key={index}>
            <h2>{post?.name}</h2>
            <h2>{post?.content}</h2>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
