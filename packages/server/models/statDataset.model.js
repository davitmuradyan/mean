const mongoose = require('mongoose');
const {Schema} = mongoose;

const statDataset = new Schema({
  data: {
    type: Array,
    required: true,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  },
  course: {
    ref: 'Course',
    type: Schema.Types.ObjectId,
  }
});

module.exports = mongoose.model('StatDataset', statDataset);
