const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  updateService,
  deleteService
} = require('../controllers/servicesController');

router.post('/', createService);
router.get('/', getAllServices);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
