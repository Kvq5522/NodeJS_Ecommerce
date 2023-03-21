'use strict';

const jwt = require('jsonwebtoken');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const asyncHandler = require('../helper/asyncHandler');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // const accessToken = await jwt.sign(payload, privateKey, {
        //     algorithm: 'RS256',
        //     expiresIn: '2 days'
        // });

        // const refreshToken = await jwt.sign(payload, privateKey, {
        //     algorithm: 'RS256',
        //     expiresIn: '7 days'
        // });

        const accessToken = await jwt.sign(payload, publicKey, {
            expiresIn: '2 days'
        });

        const refreshToken = await jwt.sign(payload, privateKey, {
             expiresIn: '7 days'
        });

        await jwt.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                console.log(`[P]::createTokenPair::err`, err);
            }
        });

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        
    }
};

const authentication = asyncHandler(async (req, res, next) => {

    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid request!');

    const keyStore = await findByUserId(userId); //find user key store
    if (!keyStore) throw new NotFoundError('Not found key store!');

    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN];
            const decoded = await jwt.verify(refreshToken, keyStore.privateKey);
    
            if (decoded.userId != userId) throw new AuthFailureError('Invalid user!');
    
            req.keyStore = keyStore;
            req.user = decoded;
            req.refreshToken = refreshToken;
            return next();
        } catch(error) {
            throw error;
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError('Invalid key store!');

    try {
        const decoded = await jwt.verify(accessToken, keyStore.publicKey);

        if (decoded.userId != userId) throw new AuthFailureError('Invalid user!');

        req.keyStore = keyStore;
        return next();
    } catch(error) {
        throw error;
    }
});

const verifyJWT =  async (token, keySecret) => {
    return await jwt.verify(token, keySecret);
};


module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
};