'use strict';

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode');

class successResponse {
    constructor({message, statusCode = StatusCodes.OK, reason = ReasonPhrases.OK, metadata = {}}) {
        this.message = !message ? ReasonPhrases.OK : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends successResponse {
    constructor({message, metadata}) {
        super({message, metadata});
    }
}

class CREATED extends successResponse {
    constructor({message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata, options = {}}) {
        super({message, statusCode, reasonStatusCode, metadata});
        this.options = options;
    }
}

module.exports = {
    OK,
    CREATED,
    successResponse
}