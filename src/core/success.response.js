'use strict';

const StatusCode = {
    OK: 200,
    CREATED: 201,
};

const ReasonStatusCode = {
    OK: 'OK',
    CREATED: 'Created',
}

class successResponse {
    constructor({message, statusCode = StatusCode.OK, reason = ReasonStatusCode.OK, metadata = {}}) {
        this.message = !message ? ReasonStatusCode.OK : message;
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
    constructor({message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata, options = {}}) {
        super({message, statusCode, reasonStatusCode, metadata});
        this.options = options;
    }
}

module.exports = {
    OK,
    CREATED
}