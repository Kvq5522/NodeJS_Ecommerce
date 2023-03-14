'use strict'

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(message = ReasonPhrases.SERVER, statusCode = StatusCodes.SERVER) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}


module.exports = {
    ConflictRequestError,
    BadRequestError,
    InternalServerError,
    AuthFailureError
}