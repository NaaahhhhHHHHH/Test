const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false }, 
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  timeslot: { type: Date, required: true }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
