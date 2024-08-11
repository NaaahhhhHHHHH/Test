const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customersController');

router.post('/api/customers', createCustomer);
router.get('/api/customers', getAllCustomers);
router.put('/api/customers/:id', updateCustomer);
router.delete('/api/customers/:id', deleteCustomer);

module.exports = router;
