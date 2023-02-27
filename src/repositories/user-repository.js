const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const { ClientError } = require('../utils/errors');
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

    getUserById = async (id) => {
        try {
            const user = await User.findById(id);
            if(!user) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No registered user found for the given email'
                }, StatusCodes.NOT_FOUND);
            }
            return user;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UserRespository;