const { BookRepository } = require('../repositories/index');
const logger = require('../config/logger');
const ValidationError = require('../utils/errors/validation-error');
const { ClientError } = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');

class BookService {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    create = async (data) => {
        try {
            const book = await this.bookRepository.create(data);
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
            if(!book) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No book found for the given id'
                }, StatusCodes.NOT_FOUND);
            }
            return book;
        } catch(error) {
            logger.error("Something went wrong in Book Service : Get", error);
            throw error;
        }
    }

}

module.exports = BookService;