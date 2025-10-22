"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidGraph = void 0;
const error_1 = require("../utils/error");
const isValidGraph = (schema, args) => {
    const reselt = schema.safeParse(args);
    if (reselt.success == false) {
        let errorMsg = reselt.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message
        }));
        throw new error_1.BadRequestExpection(JSON.stringify(errorMsg), errorMsg);
    }
};
exports.isValidGraph = isValidGraph;
