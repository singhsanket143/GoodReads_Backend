const { UserRepository } = require('../repositories/index');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        try {
            const response = await this.userRepository.create(data);
            return response;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UserService;