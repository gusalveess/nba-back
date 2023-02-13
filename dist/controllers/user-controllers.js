"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserInfoController = exports.CreateUserInfoController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_info_service_1 = __importDefault(require("../services/user-info-service"));
async function CreateUserInfoController(req, res) {
    const data = req.body;
    const { token } = req;
    try {
        await user_info_service_1.default.CreateUserInfo(data, token);
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (err) {
        console.log(err);
        if (err.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.CreateUserInfoController = CreateUserInfoController;
async function GetUserInfoController(req, res) {
    const { token } = req;
    console.log(req);
    try {
        const result = await user_info_service_1.default.GetUserInfo(token);
        console.log(result);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.GetUserInfoController = GetUserInfoController;
