"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExpection = exports.NotAuthriztionExpection = exports.NotFoundExpection = exports.ConflictExpection = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class ConflictExpection extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictExpection = ConflictExpection;
class NotFoundExpection extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundExpection = NotFoundExpection;
class NotAuthriztionExpection extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
exports.NotAuthriztionExpection = NotAuthriztionExpection;
class BadRequestExpection extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestExpection = BadRequestExpection;
