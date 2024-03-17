import Blog from "../model/blogModel.js";

export const create = async (req, res) => {
  try {
    const blogData = new Blog(req.body);

    if (!blogData) {
      return res.status(404).json({ msg: "Blog Data not Found" });
    }

    const savedData = await blogData.save();
    res.status(201).json(savedData); // Return newly created blog with 201 status (Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const searchQuery = req.query.q; // Assuming the search query is passed as 'q' parameter in the URL
    let blogData;

    if (searchQuery) {
      // If search query exists, perform search
      blogData = await Blog.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on 'name' field
          { content: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on 'content' field
        ],
      }).sort({ createdAt: -1 });
    } else {
      // If no search query, return all blog data
      blogData = await Blog.find().sort({ createdAt: -1 });
    }

    res.status(200).json(blogData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const dataExist = await Blog.findById(id);
    if (!dataExist) return res.status(400).json({ msg: "Data Not Found" });

    res.status(200).json(dataExist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const dataExist = await Blog.findById(id);
    if (!dataExist) return res.status(401).json({ msg: "Data Not Found" });

    const updatedData = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const dataExist = await Blog.findById(id);
    if (!dataExist) return res.status(401).json({ msg: "Data Not Found" });

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
