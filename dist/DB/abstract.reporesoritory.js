"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractReporistory = void 0;
class AbstractReporistory {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        const doc = new this.model(item);
        doc["isNew"] = true;
        return await doc.save();
    }
    async exists(filter, projection, option) {
        return await this.model.findOne(filter, projection, option);
    }
    async getOne(filter, projection, option) {
        return await this.model.findOne(filter, projection, option);
    }
    async update(filter, update, option) {
        await this.model.updateOne(filter, update, option);
    }
    async delte(filter) {
        await this.model.deleteOne(filter);
    }
}
exports.AbstractReporistory = AbstractReporistory;
