const { StatusCodes } = require('http-status-codes');
const { UserRepository, BookShelfRepository } = require('../repositories/index');
const { ClientError } = require('../utils/errors');
const ValidationError = require('../utils/errors/validation-error');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.bookShelfRepository = new BookShelfRepository();
    }

    signup = async (data) => {
        try {
            const user = await this.userRepository.create(data);
            await this.bookShelfRepository.bulkCreate([
                {
                    userId: user.id,
                    name: 'read'
                },
                {
                    userId: user.id,
                    name: 'currently_reading'
                },
                {
                    userId: user.id,
                    name: 'want_to_read'
                }
            ])
            return user;
        } catch(error) {
            if(error.name == 'ValidationError') {
                throw new ValidationError({
                    errors: error.errors,
                    message: error.message,
                });
            }
            throw error;
        }
    }

    signin = async (data) => {
        try {
            const user = await this.userRepository.getUserByEmail(data.email);
            if(!user) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No registered user found for the given email'
                }, StatusCodes.NOT_FOUND);
            }
            const passwordMatch = user.comparePassword(data.password);
            if(!passwordMatch) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'Password given is not correct, please try again!'
                })
            }
            const jwtToken = user.generateJWT();
            return {
                token: jwtToken,
                username: user.username
            };
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UserService;