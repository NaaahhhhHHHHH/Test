const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model('Category', CategorySchema);
