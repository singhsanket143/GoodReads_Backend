const express = require('express');

const { UserController, AuthorController, GenreController, BookController } = require('../../controllers/index');
const { AuthMiddlewares, AuthorMiddlewares } = require('../../middlewares/index');

const router = express.Router();

router.post(
    '/signup',
    AuthMiddlewares.validateSignupRequest,
    UserController.signup
);
router.post(
    '/signin',
    AuthMiddlewares.validateSigninRequest,
    UserController.signin
);

router.get('/home', AuthMiddlewares.isAuthenticated, (req, res) => {
    return res.status(200).json({message: "ok"});
});


router.post(
    '/authors', 
    AuthorMiddlewares.validateCreateRequest,
    AuthorController.create
);
router.get('/authors', AuthorController.getAll);

router.post('/genres', GenreController.create);

router.post('/books', BookController.create);
router.get('/books', BookController.getAll);

module.exports = router;