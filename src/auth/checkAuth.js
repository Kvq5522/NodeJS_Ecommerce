'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const { BadRequestError } = require('../core/error.response');
const { findByID } = require('../services/apikey.service');

const checkApiKey = async (req, res, next) => {
    const key = req.headers[HEADER.API_KEY]?.toString();

    if (!key) {
        throw new BadRequestError('API key is required')
    }

    //check obj key
    const objKey = await findByID(key);

    if (!objKey) {
        throw new BadRequestError('API key is invalid')
    }

    req.objKey = objKey;

    return next();
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            throw new BadRequestError('Permission denied');
        }
        
        const validPermission = req.objKey.permissions.includes(permission);

        if (!validPermission) {
            throw new BadRequestError('Permission denied');
        }

        return next();
    };
};

const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = {
    checkApiKey,
    checkPermission, 
    asyncHandler
};