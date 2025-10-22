import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { resolve } from "path";
import { ChatRipository } from "../../../DB/chat/chat.ripository";
import { MessageRipository } from "../../../DB/Message/message.repository";
import { isAuthenticatedGraph } from "../../../Middleware/isAuthenticatedGraph";
import { isValidGraph } from "../../../Middleware/validate.middleware Graph";
import z from "zod";

export const ChatQuery = {
    getChat: {
        type: new GraphQLObjectType({
            name: "chatRoot",
            fields: {
                _id: { type: GraphQLID },
                users: { type: new GraphQLList(GraphQLID) },
                message: { type: new GraphQLList(GraphQLID) },

            },
        }),
        args: {
            id: { type: GraphQLID },
            userLogin: { type: GraphQLID },
        },
        resolve: async (parent, args, context) => {
            await isAuthenticatedGraph(context)
            isValidGraph(z.object({
                id: z.string(),
                userLogin: z.string(),
            }), args)
            console.log(context)
            const chatRepo = new ChatRipository()
            const chat = await chatRepo.getOne({
                users: { $all: [args.id, args.userLogin] }
            }, {}, {
                populate: [
                    { path: "message" }
                ]
            })

            if (!chat) throw new Error("chat not found")
            return chat
        }
    }
}