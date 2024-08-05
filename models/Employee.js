const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  profileImage: { type: String },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
