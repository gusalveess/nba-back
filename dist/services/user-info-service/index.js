"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../../repositories/user-repository"));
const authentication_repository_1 = __importDefault(require("../../repositories/authentication-repository"));
const errors_1 = require("../../errors");
async function CreateUserInfo(data, token) {
    const Auth = await authentication_repository_1.default.findSessionByToken(token);
    if (!Auth) {
        throw (0, errors_1.unauthorizedError)();
    }
    const dataCreate = {
        userid: Auth.userid,
        teamid: data.teamid,
        teamname: data.teamname,
        logoteam: data.logoteam,
        playerid: data.playerid,
        playername: data.playername,
        playerpicture: data.playerpicture,
    };
    return await user_repository_1.default.CreateUserInfo(dataCreate);
}
async function GetUserInfo(token) {
    const Auth = await authentication_repository_1.default.findSessionByToken(token);
    if (!Auth) {
        throw (0, errors_1.unauthorizedError)();
    }
    const result = await user_repository_1.default.GetUserInfoByUserId(Auth.userid);
    return result;
}
const UserInfoService = {
    CreateUserInfo,
    GetUserInfo,
};
exports.default = UserInfoService;
