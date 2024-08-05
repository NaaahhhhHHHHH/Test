const Gallery = require('../models/Gallery');

// Create a new gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    const newGalleryItem = new Gallery(req.body);
    const galleryItem = await newGalleryItem.save();
    res.status(201).json(galleryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all gallery items
exports.getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.status(200).json(galleryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a gallery item
exports.updateGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(galleryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
