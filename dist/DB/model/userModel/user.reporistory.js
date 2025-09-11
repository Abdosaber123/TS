"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const abstract_reporesoritory_1 = require("../../abstract.reporesoritory");
const user_model_1 = require("./user.model");
class UserRepository extends abstract_reporesoritory_1.AbstractReporistory {
    constructor() {
        super(user_model_1.User);
    }
    getAlluser(filter) {
        this.model.findOne(filter);
    }
}
exports.UserRepository = UserRepository;
