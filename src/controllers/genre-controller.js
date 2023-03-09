const { StatusCodes } = require('http-status-codes');

const { GenreService } = require('../services/index');
const { 
    internalServerErrorResponse, 
    customErrorResponse 
} = require('../utils/common/response-objects');

class GenreController {
    constructor() {
        this.genreService = new GenreService();
    }

    create = async (req, res) => {
        try {
            const author = await this.genreService.create({
                name: req.body.name
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the Genre',
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
}

module.exports = new GenreController();