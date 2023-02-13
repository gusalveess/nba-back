"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogOutController = exports.LoginController = exports.SignUpController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const authentication_service_1 = __importDefault(require("../services/authentication-service"));
async function SignUpController(req, res) {
    const data = req.body;
    try {
        await authentication_service_1.default.SignUpService(data);
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (err) {
        console.log(err);
        if (err.name === "InvalidEmailError") {
            return res.status(http_status_1.default.CONFLICT).send(err.message);
        }
    }
}
exports.SignUpController = SignUpController;
async function LoginController(req, res) {
    const { email, password } = req.body;
    try {
        const { token, name } = await authentication_service_1.default.LoginService(email, password);
        const result = {
            token: token,
            name: name
        };
        return res.status(http_status_1.default.CREATED).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED).send({});
        }
    }
}
exports.LoginController = LoginController;
async function LogOutController(req, res) {
    const { userId } = req;
    try {
        await authentication_service_1.default.LogOutService(userId);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (err) {
        console.log(err);
        if (err.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED).send({});
        }
    }
}
exports.LogOutController = LogOutController;
