const mongoose = require('mongoose');
const { Schema } = mongoose;
const { STATUSES: { STATUS_PENDING } } = require('../constants');

const Course = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  problems: {
    type: Array,
    required: true,
  },
  needDB: {
    type: Boolean,
    required: true,
  },
  comments: {
    type: String,
  },
  feedback: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  userCreated: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: STATUS_PENDING,
  }
});

module.exports = mongoose.model('Course', Course);
