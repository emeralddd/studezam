const mongo = require('mongoose');
const Schema = mongo.Schema;

const Submission = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    submittedDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    examination: {
        type: Schema.Types.ObjectId,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    answer: {
        type: [],
        required: true
    },
    correct: {
        type: Number,
        required: true
    },
});

module.exports = mongo.model('submissions', Submission);