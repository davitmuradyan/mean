const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: {
      type: String,
      required: true,
      default: 'student'
    },
});

module.exports = mongoose.model('User', User);
