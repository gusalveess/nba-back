import Joi from "joi";
import { UserInfoBody } from "../protocols";

export const UserInfoSchema = Joi.object<UserInfoBody>({
    teamid: Joi.number().required(),
    teamname: Joi.string().required(),
    logoteam: Joi.string().required(),
    playerid: Joi.number().required(),
    playername: Joi.string().required(),
    playerpicture: Joi.string().required(),
})