"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatQuery = void 0;
const graphql_1 = require("graphql");
const chat_ripository_1 = require("../../../DB/chat/chat.ripository");
const isAuthenticatedGraph_1 = require("../../../Middleware/isAuthenticatedGraph");
const validate_middleware_Graph_1 = require("../../../Middleware/validate.middleware Graph");
const zod_1 = __importDefault(require("zod"));
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
        resolve: async (parent, args, context) => {
            await (0, isAuthenticatedGraph_1.isAuthenticatedGraph)(context);
            (0, validate_middleware_Graph_1.isValidGraph)(zod_1.default.object({
                id: zod_1.default.string(),
                userLogin: zod_1.default.string(),
            }), args);
            console.log(context);
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
