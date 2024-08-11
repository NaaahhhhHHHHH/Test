const express = require('express');
const router = express.Router();
const {
  createGalleryItem,
  getAllGalleryItems,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

router.post('/api/gallery', createGalleryItem);
router.get('/api/gallery', getAllGalleryItems);
router.put('/api/gallery/:id', updateGalleryItem);
router.delete('/api/gallery/:id', deleteGalleryItem);

module.exports = router;
