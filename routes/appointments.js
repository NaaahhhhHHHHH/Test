const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentsController');

router.post('/api/appointments', authenticateToken, createAppointment);
router.get('/api/appointments', authenticateToken, getAllAppointments);
router.put('/api/appointments/:id', authenticateToken, updateAppointment);
router.delete('/api/appointments/:id', authenticateToken, deleteAppointment);

module.exports = router;
