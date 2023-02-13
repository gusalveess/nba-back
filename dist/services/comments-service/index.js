"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const comments_repository_1 = __importDefault(require("../../repositories/comments-repository"));
const authentication_repository_1 = __importDefault(require("../../repositories/authentication-repository"));
async function CreateCommentService(data, token) {
    const findToken = await authentication_repository_1.default.findSessionByToken(token);
    if (!findToken) {
        throw (0, errors_1.notFoundError)();
    }
    if (!data) {
        throw (0, errors_1.notFoundError)();
    }
    const InfoData = {
        comment: data.comment,
        gameid: data.gameid,
        userid: findToken.userid
    };
    return await comments_repository_1.default.CreateComment(InfoData);
}
async function GetCommentsService(gameid) {
    if (!gameid) {
        throw (0, errors_1.notFoundError)();
    }
    const result = await comments_repository_1.default.GetCommentsByGameId(parseInt(gameid));
    return result;
}
const commentService = {
    CreateCommentService,
    GetCommentsService
};
exports.default = commentService;
