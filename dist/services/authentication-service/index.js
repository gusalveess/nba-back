"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const authentication_repository_1 = __importDefault(require("../../repositories//authentication-repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function SignUpService(data) {
    const verify = await authentication_repository_1.default.FindEmail(data.email);
    if (verify) {
        throw (0, errors_1.invalidEmailError)(data.email);
    }
    const passwordHashed = await bcrypt_1.default.hash(data.password, 12);
    const CreateData = {
        name: data.name,
        email: data.email,
        password: passwordHashed,
        picture: data.picture
    };
    return await authentication_repository_1.default.CreateUser(CreateData);
}
async function LoginService(email, password) {
    const verify = await authentication_repository_1.default.FindAccount(email);
    if (!verify) {
        throw (0, errors_1.unauthorizedError)();
    }
    const userId = verify.id.toString();
    const isPasswordValid = await bcrypt_1.default.compareSync(password, verify.password);
    if (!isPasswordValid) {
        throw (0, errors_1.unauthorizedError)();
    }
    const token = jsonwebtoken_1.default.sign(userId, process.env.JWT_SECRET);
    await authentication_repository_1.default.Login(token, verify.id);
    const data = {
        token: token,
        name: verify.name
    };
    return data;
}
async function LogOutService(userId) {
    const verify = await authentication_repository_1.default.ActiveSession(userId);
    if (!verify) {
        throw (0, errors_1.unauthorizedError)();
    }
    return await authentication_repository_1.default.LogOut(verify.id);
}
const authenticationService = {
    SignUpService,
    LoginService,
    LogOutService,
};
exports.default = authenticationService;
