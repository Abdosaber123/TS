import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ChatQuery } from "./Module/chat/graphql/query";

let query = new GraphQLObjectType({
    name:"rootName",
    fields: {
        ...ChatQuery
    }
})
export const appSchema = new GraphQLSchema({
    query,
})