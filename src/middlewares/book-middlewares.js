const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const { 
    internalServerErrorResponse 
} = require('../utils/common/response-objects');

/**
* validator for user signup
* @param req -> http request object
* @param res -> http response object
* @param next -> next middleware
*/
const validateGetRequest = async (req, res, next) => {
   // validate name of the user
   if(!mongoose.isValidObjectId(req.params.id)) {
       return res
               .status(StatusCodes.BAD_REQUEST)
               .json(internalServerErrorResponse({explanation: "Invalid book id present in the request"}));
   }
   next();
}

const validateUpdateUserRatingRequest = async (req, res, next) => {
    if(isNaN(req.params.rating)) {
        return res
               .status(StatusCodes.BAD_REQUEST)
               .json(internalServerErrorResponse({explanation: "Invalid rating present in the request"}));
    }
    next();
}

module.exports = {
    validateGetRequest,
    validateUpdateUserRatingRequest
}