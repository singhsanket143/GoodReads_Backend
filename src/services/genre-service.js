const { GenreRepository } = require('../repositories/index');
const logger = require('../config/logger');
const ValidationError = require('../utils/errors/validation-error');

class GenreService {
    constructor() {
        this.genreRepository = new GenreRepository();
    }

    create = async (data) => {
        try {
            const genre = await this.genreRepository.create({
                ...data,
                books: []
            });
            return genre;
        } catch(error) {
            logger.error("Something went wrong in Genre Service : Create", error);
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

module.exports = GenreService;