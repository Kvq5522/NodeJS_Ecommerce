'use strict';

const keyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
    static createKeyToken = async (userId, publicKey, privateKey) => {
        try {
            // const publicKeyString = publicKey.toString();
            const token = await keyTokenModel.create({
                name: userId,
                publicKey: publicKey,
                privateKey: privateKey
            });

            // return token ? publicKeyString : null;
            return token ? token.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenService;