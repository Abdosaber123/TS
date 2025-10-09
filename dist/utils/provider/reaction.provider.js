"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactionProvider = void 0;
const enum_1 = require("../common/enum");
const error_1 = require("../error");
const addReactionProvider = async (repo, id, userId, reaction) => {
    const postExists = await repo.exists({ _id: id });
    if (!postExists) {
        throw new error_1.NotFoundExpection("post not found");
    }
    let userReactionPostIndex = postExists.reaction.findIndex((reactions) => {
        return reactions.userId.toString() == userId.toString();
    });
    if (userReactionPostIndex == -1) {
        await repo.update({ _id: id }, {
            $push: {
                reaction: {
                    reaction: [null, undefined, ""].includes(reaction)
                        ? enum_1.REACTION.like
                        : reaction,
                    userId,
                },
            },
        });
    }
    else if ([undefined, null, ""].includes(reaction)) { //lazem a send null 34an ams7 ek like
        await repo.update({ _id: id }, {
            $pull: { reaction: postExists.reaction[userReactionPostIndex] }
        });
    }
    else {
        await repo.update({ _id: id, "reaction.userId": userId }, { "reaction.$.reaction": reaction });
    }
};
exports.addReactionProvider = addReactionProvider;
