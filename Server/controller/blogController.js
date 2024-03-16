import Blog from "../model/blogModel.js";

export const create = async (req, res) => {
  try {
    const blogData = new Blog(req.body);

    if (!blogData) {
      return res.status(404).json({ msg: "Blog Data not Found" });
    }

    const savedData = await blogData.save();
    res.status(200).json(savedData);
  } catch {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const blogData = await Blog.find();
    if (!blogData) return res.status(404).json({ msg: "Data not found" });

    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const dataExist = await Blog.findById(id);
    if (!dataExist) return res.status(400).json({ msg: "Data Not Found" });

    res.status(200).json(dataExist);
  } catch (error) {
    res.status(500).json({ error: error });
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
  } catch {
    res.status(500).json({ error: error });
  }
};

export const deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const dataExist = await Blog.findById(id);
    if (!dataExist) return res.status(401).json({ msg: "Data Not Found" });

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data deleted Successfully" });
  } catch {
    res.status(500).json({ error: error });
  }
};
