const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  openingHours: { type: String, required: false },
  url: { type: String, required: false }
});

module.exports = mongoose.model('Branch', BranchSchema);
