'use strict'

const apiKey = require('../models/apikey.model');

const findByID = async (id) => {
    const objKey = await apiKey.findOne({id, status: true}).lean();

    return objKey;
};

module.exports = {
    findByID
};