const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services/index');


class UserController {
    constructor() {
        this.userService = new UserService();
    }

    signup = async (req, res) => {
        try {
            const user = await this.userService.signup({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the User',
                err: {},
                data: user,
                success: true
            });
        } catch(error) {
            return res.status(error.statusCode).json({
                message: error.message,
                err: error.explanation,
                data: {},
                success: false
            });
        }
    }
}

module.exports = new UserController();