"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const error_1 = require("../utils/error");
const isValid = (schema) => {
    return (req, res, next) => {
        let data = { ...req.body, ...req.params, ...req.query };
        const reselt = schema.safeParse(data);
        if (reselt.success == false) {
            let errorMsg = reselt.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            throw new error_1.BadRequestExpection("Check Your Validation", errorMsg);
        }
        next();
    };
};
exports.isValid = isValid;
