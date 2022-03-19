const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentschema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },

    updated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', commentschema);