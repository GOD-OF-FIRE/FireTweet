import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BlogPost from "./components/BlogPost";
import CreatePostForm from "./components/CreatePostForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreatePostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
