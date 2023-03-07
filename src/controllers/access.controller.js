'use strict';

const { signUp } = require('../services/access.service');

class AccessController {
    signUp = async (req, res, next) => {
        const {name, email, password} = req.body;
        return res.status(201).json(await signUp(name, email, password));
    }
}

module.exports = new AccessController();