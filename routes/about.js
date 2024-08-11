const express = require('express');
const router = express.Router();
const {
  createAbout,
  getAllAbout,
  updateAbout,
  deleteAbout
} = require('../controllers/aboutController');

router.post('/api/about', createAbout);
router.get('/api/about', getAllAbout);
router.put('/api/about/:id', updateAbout);
router.delete('/api/about/:id', deleteAbout);

module.exports = router;
