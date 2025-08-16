const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  originalPrompt: {
    type: String,
    required: true
  },
  generatedSummary: {
    type: String,
    required: true
  },
  editedSummary: {
    type: String
  },
  model: {
    type: String,
    required: true
  },
  tokensUsed: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Summary', summarySchema);
