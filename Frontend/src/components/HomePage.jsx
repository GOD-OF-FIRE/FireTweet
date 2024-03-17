import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  Drawer,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { isMobile } from "../utilities/DetectViewportSize";
import { toast } from "react-hot-toast";

function HomePage({ onLogout }) {
  const [posts, setPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({
    id: "",
    name: "",
    content: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostToDelete, setSelectedPostToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const mobileView = isMobile();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getAll");
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to Fetch Post");
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (post) => {
    setEditedPost(post);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setEditedPost({
      id: "",
      name: "",
      content: "",
    });
    setDrawerOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/update/${editedPost?._id}`,
        editedPost
      );
      toast.success("Post updated successfully");
      fetchData();
      console.log("Post updated successfully");
    } catch (error) {
      toast.error("Failed to update post");
      console.error("Error updating post:", error);
    }
    setDrawerOpen(false);
  };

  const handleDeleteClick = (post) => {
    setSelectedPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/delete/${selectedPostToDelete._id}`
      );
      fetchData();
      toast.success("Post deleted successfully");
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
    setDeleteDialogOpen(false);
  };


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/getAll?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      toast.error("Failed to fetch posts");
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{if(!searchQuery){
    setSearchResults([])
    fetchData()
  }},[searchQuery])

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <nav
        style={{
          display: "flex",
          padding: "12px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          width: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          margin: "0",
          backdropFilter: "blur(8px)", // Apply blur effect
          backgroundColor: "#36363689", // Greyish background
          boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.5)",
          height: "4vh", // White shadow
        }}
      >
        <Typography
          variant="h4"
          style={{
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: mobileView ? "nowrap" : "initial",
          }}
        >
          Fire Blog
        </Typography>

        <IconButton
          style={{ color: "#fff", marginRight: "1em" }}
          onClick={() => {
            onLogout();
          }}
        >
          <LogoutIcon />
        </IconButton>
      </nav>

      <div style={{ minHeight: "100vh", marginTop: "7vh" }}>
        <IconButton
          style={{
            textDecoration: "none",
            background: "red",
            color: "#fff",
            marginBottom: "20px",
            position: "fixed",
            bottom: "12px",
            right: "12px",
          }}
          onClick={() => navigate("/create")}
        >
          <AddIcon />
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant={mobileView ? "h4" : "h2"}
            style={{
              margin: "20px 0px",
              textAlign: "center",
              color: "#fff",
              textShadow: "2px 2px 4px #fff",
            }}
          >
            Blazing Articles
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                width: mobileView ? "80%" : "50%",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                size="small" // Set the size to small
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{pr:2,pl:2}}
              >
                Search
              </Button>
            </div>

            {(searchResults.length > 0 ? searchResults : posts).map(
              (post, index) => (
                <div
                  key={index}
                  style={{
                    background: "#fff",
                    margin: "12px",
                    color: "#333",
                    padding: "12px",
                    borderRadius: "10px",
                    maxWidth: "80vw",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleEditClick(post);
                      }}
                    >
                      <EditIcon sx={{ color: "#176fe2" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDeleteClick(post);
                      }}
                    >
                      <DeleteIcon sx={{ color: "#e21717" }} />
                    </IconButton>
                  </div>
                  <Typography variant="h4" style={{ marginBottom: "10px" }}>
                    {post?.name}
                  </Typography>
                  <Typography variant="body1">{post?.content}</Typography>
                </div>
              )
            )}
          </div>
        </div>
        <Drawer
          anchor={mobileView ? "bottom" : "right"}
          open={drawerOpen}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              background: "#141414",
              color: "#fff",
              border: "2px solid #fff",
            },
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => {
                  handleCloseDrawer();
                }}
              >
                <CancelIcon sx={{ color: "#fff" }} />
              </IconButton>
            </div>

            <div
              style={{
                padding: "20px",
                minWidth: "300px",
                borderRadius: "12px",
                background: "#fff",
                color: "#141414",
                margin: "0px 10px 10px 10px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Edit Post
              </Typography>
              <TextField
                label="Title"
                variant="outlined"
                value={editedPost?.name}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, name: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Content"
                variant="outlined"
                multiline
                rows={6}
                value={editedPost?.content}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, content: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCloseDrawer}
                  sx={{
                    background: "#000",
                    width: "50%",
                    "&:hover": { background: "#000" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                  sx={{
                    background: "#cc0a0a",
                    width: "50%",
                    "&:hover": { background: "#cc0a0a" },
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this blog?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedPostToDelete(null);
              }}
              color="primary"
            >
              No
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default HomePage;
