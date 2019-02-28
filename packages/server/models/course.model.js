const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
   title: {
       type: String,
       required: true,
   },
});

module.exports = mongoose.model('Course', Course);
