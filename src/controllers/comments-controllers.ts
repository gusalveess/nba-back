import { Request, Response } from "express";
import httpStatus from "http-status";
import commentService from "../services/comments-service";
import { commentData } from "../protocols";
import { AuthenticatedRequest } from "../middlewares";

export async function CreateCommentControllers(req: AuthenticatedRequest, res: Response) {
    const data = req.body as Omit<commentData, 'userid'>
    console.log(req)
    const {token} = req

    try {
        await commentService.CreateCommentService(data, token);
        return res.sendStatus(httpStatus.CREATED);
    } catch (err) {
        console.log(err)
        if(err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function GetCommentsByGameId(req: AuthenticatedRequest, res: Response) {
    const {gameid} = req.params;
    try {
        const result = await commentService.GetCommentsService(gameid);
        return res.status(httpStatus.OK).send(result);
    } catch (err) {
        console.log(err)
        if(err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}