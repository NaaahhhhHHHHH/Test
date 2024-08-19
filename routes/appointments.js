const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentsController');

router.post('/api/appointments', createAppointment);
router.get('/api/appointments', getAllAppointments);
router.put('/api/appointments/:id', updateAppointment);
router.delete('/api/appointments/:id', deleteAppointment);

module.exports = router;
