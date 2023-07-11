const mongo = require('mongoose');
const Schema = mongo.Schema;

const Permission = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
});

module.exports = mongo.model('permissions', Permission);