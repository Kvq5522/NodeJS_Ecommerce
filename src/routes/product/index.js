'use strict'

const router = require('express').Router();
const ProductController = require('../../controllers/product.controller');
const asyncHandler  = require('../../helper/asyncHandler');
const { authentication } = require('../../auth/authUtils');

//search product
router.get('/search/:keySearch', asyncHandler(ProductController.getListSearchProduct));

//authentication
router.use(authentication);

//
router.post('/', asyncHandler(ProductController.createProduct));
router.post('/publish/:id', asyncHandler(ProductController.publishProductByShop));
router.post('/unpublish/:id', asyncHandler(ProductController.unpublishProductByShop));  

//query
router.get('/drafts/all', asyncHandler(ProductController.getAllDraftsForShop));
router.get('/published/all', asyncHandler(ProductController.getAllPublishedForShop));

module.exports = router;