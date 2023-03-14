'use strict';

const keyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            // const publicKeyString = publicKey.toString();
            // return token ? publicKeyString : null;

            // const token = await keyTokenModel.create({
            //     name: userId,
            //     publicKey: publicKey,
            //     privateKey: privateKey
            // });

            // return token ? token.publicKey : null;

            const filter = { user: userId };
            const update = { publicKey, privateKey, refreshedTokenUsed: [], refreshToken };
            const options = { upsert: true, new: true};

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenService;