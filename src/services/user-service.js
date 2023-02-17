const { UserRepository } = require('../repositories/index');
const ValidationError = require('../utils/errors/validation-error');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signup = async (data) => {
        try {
            const response = await this.userRepository.create(data);
            return response;
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
}

module.exports = UserService;