const mongoose = require('mongoose');

const userBookRatingSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "can't be blank"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "can't be blank"],
    },
    rating: {
        type: Number,
        required: [true, "can't be blank"],
    }
}, {timestamps: true});

const UserBookRatingModel = mongoose.model('UserBookRating', userBookRatingSchema);
module.exports = UserBookRatingModel