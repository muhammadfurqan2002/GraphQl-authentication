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
exports.User = void 0;
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "97345@873@";
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
class User {
    static CreateUser(payload) {
        const { firstName, lastName, email, password } = payload;
        const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
        const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt).update(password).digest("hex");
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                halt: salt,
                password: hashedPassword
            }
        });
    }
    static findUser(email) {
        const user = prismaClient.user.findUnique({ where: { email } });
        return user;
    }
    static generateHashed(password, salt) {
        const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt).update(password).digest("hex");
        return hashedPassword;
    }
    static generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield User.findUser(email);
            if (!user)
                throw new Error("User Not Found");
            const salt = user.halt;
            const hash = User.generateHashed(password, salt);
            if (user.password !== hash)
                throw new Error("Wrong Password");
            const token = jsonwebtoken_1.default.sign({ email: user.email, password: user.password }, secretKey);
            return token;
        });
    }
}
exports.User = User;
