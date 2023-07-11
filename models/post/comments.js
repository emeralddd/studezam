const mongo = require('mongoose');
const Schema = mongo.Schema;

const Comment = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdIn: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    level: {
        type: Number,
        required: true
    },
    reply: {
        type: Schema.Types.ObjectId,
    },
});

module.exports = mongo.model('comments', Comment);