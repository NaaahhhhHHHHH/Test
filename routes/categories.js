const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoriesController');

router.post('/', createCategory);
router.get('/', getAllCategories);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
