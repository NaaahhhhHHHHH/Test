const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController');

router.post('/api/categories', createCategory);
router.get('/api/categories', getAllCategories);
router.put('/api/categories/:id', updateCategory);
router.delete('/api/categories/:id', deleteCategory);

module.exports = router;
