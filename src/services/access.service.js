'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('../services/keyToken.service');
const { createTokenPair  } = require('../auth/authUtils');
const { getInfoData } = require('../utils/index');
const { BadRequestError, ConflictRequestError } = require('../core/error.response');

const roleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AccessService {
    static signUp = async (name, email, password) => {
        const shopHolder = await shopModel.findOne({ email }).lean();
        
        if (shopHolder) {
            throw new BadRequestError('Error: Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const newShop = await shopModel.create({
            name: name, email: email, password: hashedPassword, roles: [roleShop.SHOP]
        });

        if (newShop) {
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem',
            //     }
            // }); for large industries

            const publicKey = crypto.randomBytes(64).toString('hex');
            const privateKey = crypto.randomBytes(64).toString('hex');

            // const publicKeyString = await keyTokenService.createKeyToken(newShop._id, publicKey, privateKey);
            // const publicKeyObject = crypto.createPublicKey(publicKeyString); 

            // if (!publicKeyString) {
            //     return {
            //         code: '500',
            //         message: 'Error creating key token'
            //     }
            // }

            const keyStore = await keyTokenService.createKeyToken(newShop._id, publicKey, privateKey);

            if (!keyStore) {
                throw new ConflictRequestError('Error creating key token');
            }

            const tokens = await createTokenPair({ id: newShop._id, email }, 
                publicKey, privateKey);

            return {
                code: '201',
                metadata: {
                    shop: getInfoData({fields: ['_id', 'name', 'email'], object: newShop}),
                    tokens
                }
            }
        }

        throw new ConflictRequestError('Error creating shop');
    }
}

module.exports = AccessService