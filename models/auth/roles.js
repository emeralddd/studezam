const mongo = require('mongoose');
const Schema = mongo.Schema;

const Role = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
    },
    permissions: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    description: String,
});

module.exports = mongo.model('roles', Role);