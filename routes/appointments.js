const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentsController');

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
