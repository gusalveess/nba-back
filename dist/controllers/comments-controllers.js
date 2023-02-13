"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommentsByGameId = exports.CreateCommentControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const comments_service_1 = __importDefault(require("../services/comments-service"));
async function CreateCommentControllers(req, res) {
    const data = req.body;
    console.log(req);
    const { token } = req;
    try {
        await comments_service_1.default.CreateCommentService(data, token);
        return res.sendStatus(http_status_1.default.CREATED);
    }
    catch (err) {
        console.log(err);
        if (err.name === 'NotFoundError') {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.CreateCommentControllers = CreateCommentControllers;
async function GetCommentsByGameId(req, res) {
    const { gameid } = req.params;
    try {
        const result = await comments_service_1.default.GetCommentsService(gameid);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === 'NotFoundError') {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.GetCommentsByGameId = GetCommentsByGameId;
