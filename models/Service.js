const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
