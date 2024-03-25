import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { isMobile } from "../utilities/DetectViewportSize";
import { toast } from "react-hot-toast";

function CreatePostForm() {
  const mobileView = isMobile();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    name: "",
    content: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new blog post object
    await axios
      .post(
        "https://fireblog-backend.onrender.com/api/create",
        blogData
      )
      .then((res) => {
        navigate("/");
        toast.success("Post created successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to create post");
      });
  };

  return (
    <>
      {mobileView ? (
        <nav
          style={{
            display: "flex",
            padding: "12px",
            // justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            width: "100%",
            position: "sticky",
            top: "0",
            left: "0",
            right: "0",
            margin: "0",
            backdropFilter: "blur(8px)", // Apply blur effect
            backgroundColor: "#36363689", // Greyish background
            boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.5)", // White shadow
          }}
        >
          <IconButton
            style={{ color: "#ff5722", marginRight: "1em" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Create New Post
          </Typography>
        </nav>
      ) : null}

      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        {!mobileView ? (
          <Typography variant="h3" gutterBottom style={{ marginTop: "5vh" }}>
            Create New Post
          </Typography>
        ) : null}

        <Paper
          style={{
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "100%",
            margin: "10px",
            marginTop: "10vh",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              value={blogData.name}
              onChange={(event) =>
                setBlogData({ ...blogData, name: event.target.value })
              }
              style={{ marginBottom: "20px", width: "100%" }}
            />
            <TextField
              label="Content"
              variant="outlined"
              multiline
              rows={6}
              value={blogData.content}
              onChange={(event) =>
                setBlogData({ ...blogData, content: event.target.value })
              }
              style={{ marginBottom: "20px", width: "100%" }}
            />
            <Button
              variant="contained"
              color="secondary" // Changed button color to secondary
              type="submit"
              style={{ width: "100%" }}
            >
              Create Post
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default CreatePostForm;
