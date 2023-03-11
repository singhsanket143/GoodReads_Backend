const logger = require('../config/logger');
const Book = require('../models/book');
const User = require('../models/user');
const UserBookRating = require('../models/user-book-rating');
const CrudRepository = require('./crud-repository');

class BookRepository extends CrudRepository {
    constructor() {
        super(Book);
    }

    updateRatingByUser = async (bookId, userId, rating) => {
        try {
            const book = await Book.findById(bookId);
            const totalBookRatings = await UserBookRating.find({
                bookId: bookId
            });
            const totalBookRatingsCount = totalBookRatings.length;
            const userBookRating = await UserBookRating.findOne({
                userId: userId,
                bookId: bookId
            });
            const currentBookRating = book.rating;
            if(userBookRating) {
                var newRating = ((totalBookRatingsCount * currentBookRating) - userBookRating.rating + rating) / totalBookRatingsCount;
            } else {
                var newRating = ((totalBookRatingsCount * currentBookRating) + rating) / (totalBookRatingsCount + 1);
                await UserBookRating.create({
                    bookId: bookId,
                    userId: userId,
                    rating: rating
                });
            }
            return newRating;
        } catch(error) {
            logger.error("Something went wrong in book repo", error);
            throw error;
        }
    }
}

module.exports = BookRepository;