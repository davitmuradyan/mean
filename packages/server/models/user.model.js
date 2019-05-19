const mongoose = require('mongoose');
const { Schema } = mongoose;
const { USER_TYPES: { USER_TYPE_STUDENT } } = require('../constants');

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  authToken: {
    type: String,
    default: null
  },
  imgSrc: {
    type: String,
    required: false
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
    default: USER_TYPE_STUDENT,
  },
});

module.exports = mongoose.model('User', User);
