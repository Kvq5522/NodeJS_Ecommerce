'use strict';

const jwt = require('jsonwebtoken');

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
            console.log(`[P]::createTokenPair::decoded`, decoded);
        });

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        
    }
};

module.exports = {
    createTokenPair
};