"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSchema = void 0;
const graphql_1 = require("graphql");
const query_1 = require("./Module/chat/graphql/query");
let query = new graphql_1.GraphQLObjectType({
    name: "rootName",
    fields: {
        ...query_1.ChatQuery
    }
});
exports.appSchema = new graphql_1.GraphQLSchema({
    query,
});
