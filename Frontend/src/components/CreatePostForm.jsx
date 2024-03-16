import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useHistory } from 'react-router-dom';

function CreatePostForm() {
  const navigate = useNavigate();
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  const [blogData, setBlogData] = useState({
    name: "",
    content: "",
  });
  // const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new blog post object
    await axios
      .post("http://localhost:3000/api/create", blogData)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={blogData?.name}
            onChange={(event) =>
              setBlogData({ ...blogData, name: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={blogData?.content}
            onChange={(event) =>
              setBlogData({ ...blogData, content: event.target.value })
            }
          ></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;
