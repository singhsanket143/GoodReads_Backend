const { StatusCodes } = require('http-status-codes');

/**
* validator for user signup
* @param req -> http request object
* @param res -> http response object
* @param next -> next middleware
*/
const validateCreateRequest = async (req, res, next) => {
   // validate name of the user
   if(!req.body.name) {
       return res
               .status(StatusCodes.BAD_REQUEST)
               .json(internalServerErrorResponse({explanation: "Name of the author not present in the request"}));
   }
   next();
}

module.exports = {
    validateCreateRequest
}