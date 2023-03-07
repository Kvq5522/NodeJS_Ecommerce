'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const { findByID } = require('../services/apikey.service');

const checkApiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if (!key) {
            return res.status(403).json({
                message: 'Forbidden error'
            });
        }

        //check obj key
        const objKey = await findByID(key);

        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden error'
            });
        }

        req.objKey = objKey;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission Denied'
            });
        }
        
        console.log('Permissions::', req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permission);

        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission Denied'
            });
        }

        return next();
    };
};

module.exports = {
    checkApiKey,
    checkPermission
};