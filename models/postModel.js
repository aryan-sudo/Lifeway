const mongoose = require('mongoose');
const { Schema } = mongoose;
const postschema = new Schema({
    title: {
        type: String,

    },
    text: {
        type: String

    },
    image: {
        type: String

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

module.exports = mongoose.model('Post', postschema);