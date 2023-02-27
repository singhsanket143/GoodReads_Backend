const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { 
    internalServerErrorResponse 
} = require('../utils/common/response-objects');
const { JWT_SECRET } = require('../config/server-config');
const { UserRepository } = require('../repositories/index');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json(internalServerErrorResponse({explanation: 'No token provided'}));
        }
        const response = jwt.verify(token, JWT_SECRET);
        if(!response) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({explanation: 'Token not verified'}));
        }
        const userRepository = new UserRepository();
        const user = await userRepository.getUserById(response.id);
        req.user = user.id;
        next();
    } catch(error) {
        if(error.name == "JsonWebTokenError") {
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(internalServerErrorResponse(error));
        }
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            return res
                    .status(StatusCodes.NOT_FOUND)
                    .json(internalServerErrorResponse(error));
        }
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(internalServerErrorResponse(error));
    }
}

module.exports = {
    isAuthenticated
}