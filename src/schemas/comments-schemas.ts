import Joi from "joi";
import { comments } from "@prisma/client";

type commentsData = Omit<comments, 'id' | 'userid'>

export const CreateCommentSchema = Joi.object<commentsData>({
    comment: Joi.string().required(),
    gameid: Joi.number().required()
})