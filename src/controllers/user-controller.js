const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services/index');


class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async signup(req, res) {
        try {
            const user = await this.userService.signup({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            });
            return res.status(StatusCodes.OK).json({
                message: 'Successfully created the User',
                err: {},
                data: user,
                success: true
            })
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong',
                err: error,
                data: {},
                success: false
            });
        }
    }
}

module.exports = UserController;