const {AuthorRepository} = require('../repositories/index');
const logger = require('../config/logger');
const ValidationError = require('../utils/errors/validation-error');

class AuthorService {
    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    create = async (data) => {
        try {
            const author = await this.authorRepository.create(data);
            return author;
        } catch(error) {
            logger.error("Something went wrong in Author Service : Create", error);
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
            const authors = await this.authorRepository.getAll();
            return authors;
        } catch(error) {
            logger.error("Something went wrong in Author Service : GetAll", error);
            throw error;
            
        }
    }
}

module.exports = AuthorService;