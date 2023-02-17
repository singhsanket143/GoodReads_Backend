const { StatusCodes } = require('http-status-codes')
class ClientError extends Error {
    constructor(error) {
        super();
        this.name = 'ClientError';
        this.message = error.message;
        this.explanation = error.explanation;
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ClientError;