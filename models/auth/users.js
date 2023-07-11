const mongo = require('mongoose');
const Schema = mongo.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    roles: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    permissions: {
        type: [Number],
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    description: String,
    color: {
        type: String,
        required: true,
    },
    isPendingDelete: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongo.model('users', User);