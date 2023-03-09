const { BookRepository } = require('../repositories/index');
const logger = require('../config/logger');
const ValidationError = require('../utils/errors/validation-error');

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

}

module.exports = BookService;