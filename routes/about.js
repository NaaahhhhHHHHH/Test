const express = require('express');
const router = express.Router();
const {
  createAbout,
  getAllAbout,
  updateAbout,
  deleteAbout
} = require('../controllers/aboutController');

router.post('/', createAbout);
router.get('/', getAllAbout);
router.put('/:id', updateAbout);
router.delete('/:id', deleteAbout);

module.exports = router;
