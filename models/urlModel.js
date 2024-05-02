const mongoose = require('mongoose');

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
  visits: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
        required: true
      }
    }
  ] // Array to store visit history
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;