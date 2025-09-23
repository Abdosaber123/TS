"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExpection = exports.NotAuthriztionExpection = exports.NotFoundExpection = exports.ConflictExpection = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    errorDetails;
    constructor(message, statusCode, errorDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
    }
}
exports.AppError = AppError;
class ConflictExpection extends AppError {
    constructor(message, errorDetails) {
        super(message, 409, errorDetails);
    }
}
exports.ConflictExpection = ConflictExpection;
class NotFoundExpection extends AppError {
    constructor(message, errorDetails) {
        super(message, 404, errorDetails);
    }
}
exports.NotFoundExpection = NotFoundExpection;
class NotAuthriztionExpection extends AppError {
    constructor(message, errorDetails) {
        super(message, 401, errorDetails);
    }
}
exports.NotAuthriztionExpection = NotAuthriztionExpection;
class BadRequestExpection extends AppError {
    constructor(message, errorDetails) {
        super(message, 400, errorDetails);
    }
}
exports.BadRequestExpection = BadRequestExpection;
