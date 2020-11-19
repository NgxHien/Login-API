const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passwordUpdateTime: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    picture_url: {
        type: String,
        default: "https://image-uploader.sidz.tools/images/1590054460710-user.jpg"
    }
});
module.exports = mongoose.model('users', userSchema)