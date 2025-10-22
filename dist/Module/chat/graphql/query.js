"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatQuery = void 0;
const graphql_1 = require("graphql");
const chat_ripository_1 = require("../../../DB/chat/chat.ripository");
exports.ChatQuery = {
    getChat: {
        type: new graphql_1.GraphQLObjectType({
            name: "chatRoot",
            fields: {
                _id: { type: graphql_1.GraphQLID },
                users: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
                message: { type: new graphql_1.GraphQLList(graphql_1.GraphQLID) },
            },
        }),
        args: {
            id: { type: graphql_1.GraphQLID },
            userLogin: { type: graphql_1.GraphQLID },
        },
        resolve: async (parent, args) => {
            const chatRepo = new chat_ripository_1.ChatRipository();
            const chat = await chatRepo.getOne({
                users: { $all: [args.id, args.userLogin] }
            }, {}, {
                populate: [
                    { path: "message" }
                ]
            });
            if (!chat)
                throw new Error("chat not found");
            return chat;
        }
    }
};
