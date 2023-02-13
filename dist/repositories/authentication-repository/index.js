"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
async function FindEmail(email) {
    return await config_1.prisma.users.findFirst({
        where: {
            email: email
        }
    });
}
async function CreateUser(data) {
    return await config_1.prisma.users.create({
        data
    });
}
async function FindAccount(email) {
    return await config_1.prisma.users.findFirst({
        where: {
            email: email
        }
    });
}
async function Login(token, userId) {
    return await config_1.prisma.sessions.create({
        data: {
            token: token,
            userid: userId
        }
    });
}
async function ActiveSession(userId) {
    return await config_1.prisma.sessions.findFirst({
        where: {
            AND: {
                active: true,
                userid: userId
            }
        }
    });
}
async function LogOut(id) {
    return await config_1.prisma.sessions.update({
        where: {
            id: id
        },
        data: {
            active: false
        }
    });
}
async function findSessionByToken(token) {
    return await config_1.prisma.sessions.findFirst({
        where: {
            active: true,
            token: token
        }
    });
}
const authenticationRepository = {
    FindEmail,
    CreateUser,
    FindAccount,
    Login,
    ActiveSession,
    findSessionByToken,
    LogOut
};
exports.default = authenticationRepository;
