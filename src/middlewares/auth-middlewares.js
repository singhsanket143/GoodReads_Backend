const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { 
    internalServerErrorResponse 
} = require('../utils/common/response-objects');
const { JWT_SECRET } = require('../config/server-config');
const { UserRepository } = require('../repositories/index');

/**
 * validator for user signup
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 */
const validateSignupRequest = async (req, res, next) => {
    // validate name of the user
    if(!req.body.username) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({explanation: "Name of the user not present in the request"}));
    }
    // validate email of the user
    if(!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({explanation: "Email of the user not present in the request"}));
    }
    // validate password present of the user
    if(!req.body.password) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({explanation: "Password of the user not present in the request"}));
    }
    next();
}

/**
 * validator for user signin
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 */
const validateSigninRequest = async (req, res, next) => {
    // validate user email presence
    if(!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({explanation: "Email of the user not present in the request"}));
    }
    // validate user password presence
    if(!req.body.password) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({explanation: "Password of the user not present in the request"}));
    }
    // request is valid
    next();
}

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
        console.log(error);
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
    isAuthenticated,
    validateSignupRequest,
    validateSigninRequest
}