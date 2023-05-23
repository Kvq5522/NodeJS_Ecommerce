'use strict';

const { ProductFactory } = require('../services/product.service');
const { SuccessResponse } = require('../core/success.response');

class ProductController {
    async createProduct(req, res, next) {
        const product_shop = req.user.userId;
        return new SuccessResponse({
            message: 'Product created successfully',
            metadata: await ProductFactory.createProduct({
                type: req.body.product_type, 
                payload: {...req.body , product_shop}
            })
        }).send(res);
    }

    async publishProductByShop(req, res, next) {
        const _id = req.params.id;
        const product_shop = req.user.userId;

        return new SuccessResponse({
            message: 'Product published successfully',
            metadata: await ProductFactory.publishProductByShop({ product_shop, product_id: _id })
        }).send(res);
    }

    async unpublishProductByShop(req, res, next) {
        const _id = req.params.id;
        const product_shop = req.user.userId;

        return new SuccessResponse({
            message: 'Product unpublished successfully',
            metadata: await ProductFactory.unpublishProductByShop({ product_shop, product_id: _id })
        }).send(res);
    }

    /**
     * @desc Get all Drafts for shop
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns {JSON}
     */
    async getAllDraftsForShop(req, res, next) {
        new SuccessResponse({
            message: 'Get draft list successfully',
            metadata: await ProductFactory.findAllDraftsForShop({ product_shop: req.user.userId }) 
        }).send(res);
    }

    /** 
     * @desc Publish product by shop
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {JSON}
    */
    async getAllPublishedForShop(req, res, next) {
        new SuccessResponse({
            message: 'Get published list successfully',
            metadata: await ProductFactory.findAllPublishedForShop({ product_shop: req.user.userId }) 
        }).send(res);
    }

    /**
     * 
     */
    async getListSearchProduct(req, res, next) {
        new SuccessResponse({
            message: 'Get list search successfully',
            metadata: await ProductFactory.searchProducts(req.params)
        }).send(res);
    }
}

module.exports = new ProductController();