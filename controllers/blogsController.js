const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  // #swagger.tags = ['blogs']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'blogs data.',
            required: true,
            schema: {
                title: "",
                content: "",
                author: "",
                date: "",
                image: "",
            }
        }
  */
  try {
    const newBlog = new Blog(req.body);
    const blog = await newBlog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  // #swagger.tags = ['blogs']
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  // #swagger.tags = ['blogs']
  /* 
  #swagger.parameters['body'] = {
            in: 'body',
            description: 'blogs data.',
            required: true,
            schema: {
                title: "",
                content: "",
                author: "",
                date: "",
                image: "",
            }
        }
  */
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  // #swagger.tags = ['blogs']
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
