'use strict';

const slugify = require('slugify');
const { model, Types, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new Schema({
    product_name: { 
        type: String, 
        required: true,
        unique: true
    },
    product_thumb: {
        type: String,
        required: true
    },
    product_slug: {
        type: String,
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true,
        enums: ['Electronics', 'Clothing', 'Furniture']
    },
    product_shop: {
        type: Types.ObjectId,
        ref: 'Shop',
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_ratingsAverage: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be above 0.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    product_variations: {
        type: Array,
        default: [],
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: true,
        select: false
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//create index
productSchema.index({ product_name: 'text', product_description: 'text' });

// Products hook
productSchema.pre('save', function (next) {
    try {
        console.log(this.product_name)
        this.product_slug = slugify(this.product_name, { lower: true });
        next();
    }
    catch(err) {
        const _id = this._id;
        const type = this.product_type;

        this.model(`${type}`).deleteOne({ _id });

        next(err);
    }
});

const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    size: {
        type: [String],
    },
    material: {
        type: String,
    },
    color: {
        type: String,
    }, 
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    }
}, {
    collection: 'Clothes',
    timestamps: true
});

const eletronicSchema = new Schema({
    manufacturer: {
        type: String,
    },
    material: {
        type: String,
    },
    color: {
        type: String,
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    }
}, {
    collection: 'Electronics',
    timestamps: true
});

const furnitureSchema = new Schema({
    brand: {
        type: String,
    },
    size: {
        type: [String],
    },
    material: {
        type: String,
    },
    color: {
        type: String,
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    }
}, {
    collection: 'Furnitures',
    timestamps: true
});

const product = model(DOCUMENT_NAME, productSchema);
const clothing = model('Clothes', clothingSchema);
const eletronic = model('Electronics', eletronicSchema);
const furniture = model('Furnitures', furnitureSchema);

module.exports = {
    product,
    clothing,
    eletronic,
    furniture
};

