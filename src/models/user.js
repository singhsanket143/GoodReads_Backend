const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: {
            unique: true
        },
    },
    password: {
        type: String,
        required: true,
        minLength: [3, 'Password cannot be less than 3 characters']
    },
    username: {
        type: String,
        lowercase: true, 
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: {
            unique: true
        },
    }
});

userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = mongoose.model('User', userSchema);

module.exports = User;
