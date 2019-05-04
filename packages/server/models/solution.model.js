const mongoose = require('mongoose');
const {Schema} = mongoose;

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
    required: true,
  },
  userSubmitted: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  parameters: {
    type: Array,
    required: true,
  },
  numberOfInputs: {
    type: Number,
    required: true,
  },
  testCaseInput: {
    type: Array,
    required: true,
  },
  testCaseOutput: {
    type: String,
    required: true,
  },
  functionName: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
  feedback: {
    type: String,
  }
});

module.exports = mongoose.model('Solution', Solution);
