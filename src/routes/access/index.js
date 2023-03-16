'use strict';

const router = require('express').Router();
const { signUp, signIn, signOut } = require('../../controllers/access.controller');
const asyncHandler = require('../../helper/asyncHandler');
const { authentication } = require('../../auth/authUtils');

//signUp
router.post('/shop/sign-up', asyncHandler(signUp));

//signIn
router.post('/shop/sign-in', asyncHandler(signIn));

//authentication
router.use(authentication);

// signOut
router.post('/shop/sign-out', asyncHandler(signOut));

module.exports = router;