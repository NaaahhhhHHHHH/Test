const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  updateService,
  deleteService
} = require('../controllers/servicesController');

router.post('/api/services', createService);
router.get('/api/services', getAllServices);
router.put('/api/services/:id', updateService);
router.delete('/api/services/:id', deleteService);

module.exports = router;
