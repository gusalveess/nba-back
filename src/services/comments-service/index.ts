import { notFoundError } from "../../errors";
import { commentData } from "../../protocols";
import commentRepository from "../../repositories/comments-repository";

async function CreateCommentService(data: Omit<commentData, 'userid'>, userid: number) {

    if(!data) {
        throw notFoundError()
    }

    const InfoData = {
        comment: data.comment,
        gameid: data.gameid,
        userid: userid
    }
    return await commentRepository.CreateComment(InfoData);
}

async function GetCommentsService(gameid: string) {
    if (!gameid) {
        throw notFoundError()
    }
    return await commentRepository.GetCommentsByGameId(parseInt(gameid))
}

const commentService = {
    CreateCommentService,
    GetCommentsService
}

export default commentService