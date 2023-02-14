const User = require('../models/user');
const CrudRepository = require('./crud-repository');

class UserRespository extends CrudRepository {
    constructor() {
        super(User);
    }
}

module.exports = UserRespository;