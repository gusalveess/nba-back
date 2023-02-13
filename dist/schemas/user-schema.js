"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserInfoSchema = joi_1.default.object({
    teamid: joi_1.default.number().required(),
    teamname: joi_1.default.string().required(),
    logoteam: joi_1.default.string().required(),
    playerid: joi_1.default.number().required(),
    playername: joi_1.default.string().required(),
    playerpicture: joi_1.default.string().required(),
});
