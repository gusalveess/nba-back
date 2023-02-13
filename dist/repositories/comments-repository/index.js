"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
async function CreateComment(data) {
    return await config_1.prisma.comments.create({
        data,
    });
}
async function GetCommentsByGameId(gameid) {
    return await config_1.prisma.comments.findMany({
        where: {
            gameid: gameid,
        },
        include: {
            users: {
                select: {
                    id: true,
                    name: true,
                    picture: true
                }
            }
        }
    });
}
const commentRepository = {
    CreateComment,
    GetCommentsByGameId,
};
exports.default = commentRepository;
