const Author = require('../models/author');
const CrudRepository = require('./crud-repository');

class AuthorRepository extends CrudRepository {
    constructor() {
        super(Author);
    }
}

module.exports = AuthorRepository;