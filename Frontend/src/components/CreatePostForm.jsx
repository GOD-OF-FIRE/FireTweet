import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new blog post object
    const newPost = {
      title: title,
      content: content,
    };

    // Send a POST request to the backend to create the new post
    // fetch('/api/posts', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newPost),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Redirect to the home page after successful post creation
    //   // history.push('/');
    // })
    // .catch(error => {
    //   console.log('Error creating post:', error);
    //   // Handle error, e.g., display error message to the user
    // });
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
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;
