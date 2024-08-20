const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  createAbout,
  getAllAbout,
  updateAbout,
  deleteAbout
} = require('../controllers/aboutController');

router.post('/api/about', authenticateToken, createAbout);
router.get('/api/about', getAllAbout);
router.put('/api/about/:id', authenticateToken, updateAbout);
router.delete('/api/about/:id', authenticateToken, deleteAbout);

module.exports = router;
