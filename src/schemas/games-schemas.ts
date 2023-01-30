import Joi from "joi";
import { date } from "protocols";

export const GameDateSchema = Joi.object<date>({
    date: Joi.string().required()
})