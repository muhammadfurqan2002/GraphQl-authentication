"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
const typeDef_1 = require("./typeDef");
const resolvers_1 = require("./resolvers");
exports.User = {
    mutations: mutation_1.mutations, Queries: queries_1.Queries, typeDefs: typeDef_1.typeDefs, resolvers: resolvers_1.resolvers
};
