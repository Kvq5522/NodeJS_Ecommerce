'use strict';

const { signUp, signIn } = require('../services/access.service');

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
}

module.exports = new AccessController();