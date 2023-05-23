'use strict';

const router = require('express').Router();
const { checkApiKey, checkPermission } = require('../auth/checkAuth');

//check API key
router.use(checkApiKey);
//check permission
router.use(checkPermission('0000'));

router.use('/v1/api/product', require('./product'));
router.use('/v1/api', require('./access'));

module.exports = router;
