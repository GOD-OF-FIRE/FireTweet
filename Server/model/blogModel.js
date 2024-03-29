import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Blog", blogSchema);
