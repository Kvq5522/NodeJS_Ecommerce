'use strict';

const router = require('express').Router();
const { signUp, signIn } = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');

//signUp
router.post('/shop/sign-up', asyncHandler(signUp));

//signIn
router.post('/shop/sign-in', asyncHandler(signIn));

module.exports = router;