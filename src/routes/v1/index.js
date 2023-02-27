const express = require('express');

const { UserController } = require('../../controllers/index');
const { AuthMiddlewares } = require('../../middlewares/index');

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
})

module.exports = router;