const Book = require('../models/book');
const CrudRepository = require('./crud-repository');

class BookRepository extends CrudRepository {
    constructor() {
        super(Book);
    }
}

module.exports = BookRepository;