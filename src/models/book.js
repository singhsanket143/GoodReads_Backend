const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
    },
    description: {
        type: String,
        required: [true, "can't be blank"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;