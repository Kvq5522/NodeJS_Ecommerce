'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('../services/keyToken.service');
const { createTokenPair  } = require('../auth/authUtils');
const { getInfoData } = require('../utils/index');
const { BadRequestError, ConflictRequestError, AuthFailureError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');

const roleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AccessService {
    static signUp = async ({name, email, password}) => {
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

            const keyStore = await keyTokenService.createKeyToken({userId: newShop._id, publicKey, privateKey});

            if (!keyStore) {
                throw new ConflictRequestError('Error creating key token');
            }

            const tokens = await createTokenPair({ userId: newShop._id, email }, 
                publicKey, privateKey);

            return {
                shop: getInfoData({fields: ['_id', 'name', 'email'], object: newShop}),
                tokens
            }
        }

        throw new ConflictRequestError('Error creating shop');
    }

    static signIn = async ({email, password, refreshToken=null}) => {
        const foundShop = await findByEmail({email});
        if (!foundShop) throw new BadRequestError('Error: Email not registered');

        const match = bcrypt.compare(password, foundShop.password);
        if (!match) throw new AuthFailureError('Error: Authentication error');
        
        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');
        const tokens = await createTokenPair({ userId: foundShop._id, email },
            publicKey, privateKey);

        await keyTokenService.createKeyToken({ publicKey, privateKey, refreshToken: tokens.refreshToken, userId: foundShop._id});

        return {
            shop: getInfoData({fields: ['_id', 'name', 'email'], object: foundShop}),
            tokens
        }
    }
}

module.exports = AccessService