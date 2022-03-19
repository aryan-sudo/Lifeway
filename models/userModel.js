const mongoose = require('mongoose');
const { Schema } = mongoose;
const userschema = new Schema({
    username: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    phoneno: {
        type: String,
        required: true

    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gfollowing: {
        type: Schema.Types.ObjectId,
        ref: 'Groups'
    }
});

module.exports = mongoose.model('User', userschema);