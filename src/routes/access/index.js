'use strict';

const router = require('express').Router();
const { signUp } = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');

//signUp
router.post('/shop/sign-up', asyncHandler(signUp));

//signIn

module.exports = router;