'use strict';

const AccessService = require('../services/access.service');

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);
            const { name, email, password } = req.body;

            return res.status(201).json(await AccessService.signUp(name, email, password));
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new AccessController();