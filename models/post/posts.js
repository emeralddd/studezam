const mongo = require('mongoose');
const Schema = mongo.Schema;

const Post = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    password: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = mongo.model('posts', Post);