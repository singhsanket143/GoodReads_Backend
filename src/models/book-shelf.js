const mongoose = require('mongoose');

const bookShelfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "can't be blank"],
    },
    name: {
        type: String,
        required: [true, "can't be blank"],
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'  
        }
    ]

}, {timestamps: true});

const BookShelf = mongoose.model('BookShelf', bookShelfSchema);
module.exports = BookShelf;