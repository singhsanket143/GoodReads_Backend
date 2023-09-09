const { StatusCodes } = require('http-status-codes');

const { BookShelfService } = require('../services/index');
const { 
    internalServerErrorResponse, 
    customErrorResponse 
} = require('../utils/common/response-objects');

class BookShelfController {
    constructor() {
        this.bookShelfService = new BookShelfService();
    }

    create = async (req, res) => {
        try {
            const shelf = await this.bookShelfService.create({
                name: req.body.name,
                userId: req.user
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the BookShelf',
                err: {},
                data: shelf,
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

    getAllShelvesForAUser = async (req, res) => {
        try {
            console.log("in")
            const shelves = await this.bookShelfService.getAllShelvesForAUser(req.user);
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully fetched the BookShelves for the user',
                err: {},
                data: shelves,
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


    addBookToShelf = async (req, res) => {
        try {
            const shelf = await this.bookShelfService.addBookToShelf(req.user, req.params.shelf, req.params.bookId);
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully added book to the BookShelf for the user',
                err: {},
                data: shelf,
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

    getAllBooksForAShelf = async (req, res) => {
        try {
            const books = await this.bookShelfService.getAllBooksForAShelf(req.user, req.params.shelf);
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully fetched books from the BookShelf for the user',
                err: {},
                data: books,
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
}

module.exports = new BookShelfController();