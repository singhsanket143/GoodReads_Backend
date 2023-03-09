const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
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
    },
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre' 
        }
    ],
    pages: {
        type: Number,
        required: true
    },
    publishDate: {
        type: String
    },
    rating: {
        type: Number,
        default: 0,
        required: [true, "Can't be blank"]
    }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;