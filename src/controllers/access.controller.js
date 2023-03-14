'use strict';

const { signUp } = require('../services/access.service');

const { OK, CREATED } = require('../core/success.response');

class AccessController {
    signUp = async (req, res, next) => {
        const {name, email, password} = req.body;
        return new CREATED({
            message: 'User created successfully', 
            metadata: await signUp(name, email, password),
            options: { limit: 10 }
            }).send(res);
    }
}

module.exports = new AccessController();