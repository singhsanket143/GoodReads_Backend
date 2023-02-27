const { StatusCodes } = require('http-status-codes')
class ClientError extends Error {
    constructor(error, status = StatusCodes.BAD_REQUEST) {
        super();
        this.name = 'ClientError';
        this.message = error.message;
        this.explanation = error.explanation;
        this.statusCode = status
    }
}

module.exports = ClientError;