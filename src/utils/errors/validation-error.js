const { StatusCodes } = require('http-status-codes')
class ValidationError extends Error {
    constructor(error) {
        super();
        let explanation = [];
        Object.keys(error.errors).forEach((field) => {
            explanation.push(error.errors[field]);
        });
        this.name = 'ValidationError';
        this.message = error.message;
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;