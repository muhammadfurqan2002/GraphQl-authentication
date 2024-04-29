"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const prismaClient = new client_1.PrismaClient();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const Port = Number(process.env.PORT) || 8000;
        app.use(express_1.default.json());
        const server = new server_1.ApolloServer({
            typeDefs: `
            type Query{
                hello:String
            }
           type Mutation{
                createUser(first_name:String!,last_name:String!,email:String!,password:String!):String
           }
        `,
            resolvers: {
                Mutation: {
                    createUser: (_1, _a) => __awaiter(this, [_1, _a], void 0, function* (_, { firstName, lastName, email, password }) {
                        yield prismaClient.user.create({
                            data: {
                                firstName,
                                lastName,
                                password,
                                email
                            }
                        });
                        return "User Created";
                    })
                }
            }
        });
        yield server.start();
        app.get('/', (req, res) => {
            return res.json({ message: "Hlo From Thread App" });
        });
        app.use("/Graphql", (0, express4_1.expressMiddleware)(server));
        app.listen(Port, () => console.log(`server started at post : ${Port} `));
    });
}
init();
