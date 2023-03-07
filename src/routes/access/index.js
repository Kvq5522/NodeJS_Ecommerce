'use strict';

const router = require('express').Router();
const accessController = require('../../controllers/access.controller');

//signUp
router.post('/shop/sign-up', accessController.signUp);

//signIn

module.exports = router;