const User = require('../models/user');
const CrudRepository = require('./crud-repository');

class UserRespository extends CrudRepository {
    constructor() {
        super(User);
    }

    getUserByEmail = async (userEmail) => {
        try {
            const user = await User.findOne({
                email: userEmail
            });
            return user;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UserRespository;