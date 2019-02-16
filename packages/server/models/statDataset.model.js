const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statDataset = new Schema({
  data: {
    type: Array,
    required: true,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('StatDataset', statDataset);