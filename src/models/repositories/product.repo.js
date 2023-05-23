'use strict';

const { Types } = require('mongoose');

const { product, clothing, eletronic, furniture } = require('../product.model');

const findAllDraftsForShop = async ({ query, limit = 50, skip = 0 }) => {
   return await queryProducts(query, skip, limit);
};

const findAllPublishedForShop = async ({ query, limit = 50, skip = 0 }) => {
    return await queryProducts(query, skip, limit);
};

const searchProductsByKey = async ({keySearch}) => {
    const regexSearch = new RegExp(keySearch, 'i'); 
    const result = await product.find({
        $text: { $search: regexSearch },
        isPublished: true
    }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .lean();

    return result;
};

const publishProductByShop = async ({ product_shop, product_id }) => {
    const foundProduct = await product.findOne({ 
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)   
    });
    
    if (!foundProduct) return null;

    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    const { modifiedCount } = await foundProduct.update(foundProduct);

    return modifiedCount;
};

const unpublishProductByShop = async ({ product_shop, product_id }) => {
    const foundProduct = await product.findOne({ 
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)   
    });
    
    if (!foundProduct) return null;

    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    const { modifiedCount } = await foundProduct.update(foundProduct);

    return modifiedCount;
}

const queryProducts = async (query, skip, limit) => {
    return await product.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishedForShop,
    unpublishProductByShop,
    searchProductsByKey
}