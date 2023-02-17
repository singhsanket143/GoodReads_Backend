const express = require('express');

const { UserController } = require('../../controllers/index');

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

module.exports = router;