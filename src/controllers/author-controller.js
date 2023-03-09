const { StatusCodes } = require('http-status-codes');

const AuthorService = require('../services/author-service');
const { 
    internalServerErrorResponse, 
    customErrorResponse 
} = require('../utils/common/response-objects');

class AuthorController {
    constructor() {
        this.authorService = new AuthorService();
    }

    create = async (req, res) => {
        try {
            const author = await this.authorService.create({
                name: req.body.name
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the Author',
                err: {},
                data: author,
                success: true
            });
        } catch(error) {
            if(!error.statusCode) {
                return res
                        .status(StatusCodes.INTERNAL_SERVER_ERROR)
                        .json(internalServerErrorResponse(error));
            }
            return res
                    .status(error.statusCode)
                    .json(customErrorResponse(error));
        }
    }

    getAll = async (req, res) => {
        try {
            const authors = await this.authorService.getAll();
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched all the Authors',
                err: {},
                data: authors,
                success: true
            })
        } catch(error) {
            if(!error.statusCode) {
                return res
                        .status(StatusCodes.INTERNAL_SERVER_ERROR)
                        .json(internalServerErrorResponse(error));
            }
            return res
                    .status(error.statusCode)
                    .json(customErrorResponse(error));
        }
    }
}

module.exports = new AuthorController();