'use strict';

const { signUp, signIn, signOut, handlerRefreshToken } = require('../services/access.service');

const { OK, CREATED, successResponse } = require('../core/success.response');

class AccessController {
    signUp = async (req, res, next) => {
        const {name, email, password} = req.body;
        return new CREATED({
            message: 'User created successfully', 
            metadata: await signUp({name, email, password}),
            options: { limit: 10 }
            }).send(res);
    }

    signIn = async(req, res, next) => {
        const {email, password} = req.body;
        return new successResponse({
            message: 'User logged in successfully', 
            metadata: await signIn({email, password})
            }).send(res);
    }

    signOut = async (req, res, next) => {
        return new successResponse({
            message: 'User logged out successfully',
            metadata: await signOut({keyStore: req.keyStore})
        }).send(res);
    }

    handleRefreshToken = async (req, res, next) => {
        const refreshToken = req.refreshToken;
        const user = req.user;
        const keyStore = req.keyStore;
        return new successResponse({
            message: 'User refreshed token successfully',
            metadata: await handlerRefreshToken({ 
                refreshToken: refreshToken, 
                user: user, 
                keyStore: keyStore 
            })
        }).send(res);
    }
}

module.exports = new AccessController();