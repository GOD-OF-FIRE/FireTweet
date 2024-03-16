import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import BlogPost from "./components/BlogPost";
import CreatePostForm from "./components/CreatePostForm";
import LoginPage from "./components/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    return loginStatus === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Toaster  position="top-right"
  reverseOrder={false}/>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/create" element={<CreatePostForm />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" /> // Redirect to home if already logged in
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
