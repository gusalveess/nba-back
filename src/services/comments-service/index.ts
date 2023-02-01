import { notFoundError } from "../../errors";
import { commentData, CommentsResult } from "../../protocols";
import commentRepository from "../../repositories/comments-repository";
import authenticationRepository from "../../repositories/authentication-repository";

async function CreateCommentService(data: Omit<commentData, 'userid'>, token: string) {

    const findToken = await authenticationRepository.findSessionByToken(token);

    if (!findToken) {
        throw notFoundError()
    }

    if(!data) {
        throw notFoundError()
    }

    const InfoData = {
        comment: data.comment,
        gameid: data.gameid,
        userid: findToken.userid
    }
    return await commentRepository.CreateComment(InfoData);
}

async function GetCommentsService(gameid: string) {
    if (!gameid) {
        throw notFoundError()
    }
    const result: CommentsResult[] =  await commentRepository.GetCommentsByGameId(parseInt(gameid));

    return result
}

const commentService = {
    CreateCommentService,
    GetCommentsService
}

export default commentService