const mongo = require('mongoose');
const Schema = mongo.Schema;

const Question = new Schema({
    slug: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    choices: {
        type: [],
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
    explanation: {
        type: String
    },
    source: {
        type: String,
    },
    questionSubject: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    questionType: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    questionLevel: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    group: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    isDocDienTu: {
        type: Boolean,
        required: true,
    },
    isDocHieuVanBan: {
        type: Boolean,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

module.exports = mongo.model('questions', Question);