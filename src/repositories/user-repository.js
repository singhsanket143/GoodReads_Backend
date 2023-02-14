const User = require('../models/user');
const CrudRepository = require('./crud-repository');

class UserRespository extends CrudRepository {
    constructor() {
        console.log("creating userepo")
        super(User);
    }
}

module.exports = UserRespository;