'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    SERVER: 500
};

const StatusMessage = {
    FORBIDDEN: 'Bad request',
    CONFLICT: 'Conflict error',
    SERVER: 'Internal server error'
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = StatusMessage.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = StatusMessage.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(message = StatusMessage.SERVER, statusCode = StatusCode.SERVER) {
        super(message, statusCode);
    }
}


module.exports = {
    ConflictRequestError,
    BadRequestError,
    InternalServerError
}