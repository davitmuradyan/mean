const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    userCreated: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    }
});

module.exports = mongoose.model('Course', Course);
