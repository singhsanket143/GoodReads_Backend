const { BookRepository, AuthorRepository } = require('../repositories/index');
const logger = require('../config/logger');
const ValidationError = require('../utils/errors/validation-error');
const { ClientError } = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');

class BookService {
    constructor() {
        this.bookRepository = new BookRepository();
        this.authorRepository = new AuthorRepository();
    }

    create = async (data) => {
        try {
            const book = await this.bookRepository.create(data);
            const author = await this.authorRepository.get(data.author);
            author.books.push(book.id);
            await author.save();
            return book;
        } catch(error) {
            logger.error("Something went wrong in Book Service : Create", error);
            if(error.name == 'ValidationError') {
                throw new ValidationError({
                    errors: error.errors,
                    message: error.message,
                });
            }
            throw error;
        }
    }

    getAll = async () => {
        try {
            const books = await this.bookRepository.getAll();
            return books;
        } catch(error) {
            logger.error("Something went wrong in Book Service : GetAll", error);
            throw error;
            
        }
    }

    get = async (id) => {
        try {
            const book = await this.bookRepository.get(id);
            const totalBookRating = await this.bookRepository.getTotalBookRatings(id);
            if(!book) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No book found for the given id'
                }, StatusCodes.NOT_FOUND);
            }
            book.totalBookRating = totalBookRating;
            return book;
        } catch(error) {
            logger.error("Something went wrong in Book Service : Get", error);
            throw error;
        }
    }

    updateRating = async (userId, bookId, rating) => {
        try {
            if(rating > 5 || rating <= 0) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'Invalid rating value'
                }, StatusCodes.BAD_REQUEST);
            }
            const book = await this.bookRepository.get(bookId);
            if(!book) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No book found for the given id'
                }, StatusCodes.NOT_FOUND);
            }
            const totalBookRatingsCount = await this.bookRepository.getTotalBookRatings(bookId);
            const userBookRating = await this.bookRepository.getBookRatingByAUser(bookId,userId);
            const currentBookRating = book.rating;
            if(userBookRating) {
                var newRating = ((totalBookRatingsCount * currentBookRating) - userBookRating.rating + rating) / totalBookRatingsCount;
                await this.bookRepository.updateUserRating(bookId, userId, rating);
                await this.bookRepository.update(bookId, {rating: newRating});
            } else {
                var newRating = ((totalBookRatingsCount * currentBookRating) + rating) / (totalBookRatingsCount + 1);
                await this.bookRepository.addUserRating(bookId,userId,rating);
                await this.bookRepository.update(bookId, {rating: newRating});
            }
            return newRating;
        } catch(error) {
            logger.error("Something went wrong in the Book Service : updateRating", error);
            throw error;
        }
    }

}

module.exports = BookService;