const express = require('express');

const router = express.Router();
const {createUser, userSignIn} = require('../controllers/user');
const { validateUserSignUp, validateUserSignIn, userValidation } = require('../middlewares/validation/user');

router.post('/register', validateUserSignUp, userValidation, createUser)
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn)

module.exports = router;