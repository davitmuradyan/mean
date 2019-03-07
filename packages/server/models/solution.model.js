const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Solution = new Schema({
    course: {
        ref: 'Course',
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    solution: {
        type: JSON,
        required: true
    }
});

module.exports = mongoose.model('Solution', Solution);
