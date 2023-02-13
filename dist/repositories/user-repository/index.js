"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
async function CreateUserInfo(data) {
    return await config_1.prisma.userInfo.create({
        data,
    });
}
async function GetUserInfoByUserId(userid) {
    return await config_1.prisma.userInfo.findMany({
        where: {
            userid: userid,
        },
    });
}
const userRepository = {
    CreateUserInfo,
    GetUserInfoByUserId,
};
exports.default = userRepository;
