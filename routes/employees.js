const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeesController');

router.post('/api/employees', createEmployee);
router.get('/api/employees', getAllEmployees);
router.put('/api/employees/:id', updateEmployee);
router.delete('/api/employees/:id', deleteEmployee);

module.exports = router;
