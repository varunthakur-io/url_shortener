const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  ip: String,
  userAgent: String
}, { timestamps: true });

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true
  },
  shortURL: {
    type: String,
    required: true,
    unique: true
  },
  visits: [visitSchema] // Array to store visit history
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;