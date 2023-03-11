const mongoose = require('mongoose');

const userBookRatingSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: [true, "can't be blank"],
    }
}, {timestamps: true});

const UserBookRatingModel = mongoose.model('UserBookRatingModel', userBookRatingSchema);
module.exports = UserBookRatingModel