const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog
} = require('../controllers/blogsController');

router.post('/api/blogs', createBlog);
router.get('/api/blogs', getAllBlogs);
router.put('/api/blogs/:id', updateBlog);
router.delete('/api/blogs/:id', deleteBlog);

module.exports = router;
