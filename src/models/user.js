const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('../config/server-config');

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

userSchema.pre('save', function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    try {
        return bcrypt.compareSync(password, this.password);
    } catch(error) {
        throw error;
    }
}

userSchema.methods.generateJWT = function generate() {
    try {
        return jwt.sign({id: this._id, email: this.email}, JWT_SECRET, {
            expiresIn: JWT_EXPIRY
        });
    } catch(error) {
        console.log(error);
        throw error;
    }
    
}

const User = mongoose.model('User', userSchema);

module.exports = User;
