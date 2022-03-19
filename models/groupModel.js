const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentschema = new Schema({
    name: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'

    },
    followers: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    }
});

module.exports = mongoose.model('Group', groupschema);