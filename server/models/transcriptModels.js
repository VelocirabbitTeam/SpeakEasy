const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transcriptSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    
  }
);

module.exports = mongoose.model('Transript', transcriptSchema);
