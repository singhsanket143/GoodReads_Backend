const Genre = require('../models/genre');
const CrudRepository = require('./crud-repository');

class GenreRepository extends CrudRepository {
    constructor() {
        super(Genre);
    }
}

module.exports = GenreRepository;
