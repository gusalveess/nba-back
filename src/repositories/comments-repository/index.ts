import { prisma } from "../../config";
import { commentData } from "../../protocols";

async function CreateComment(data: commentData) {
  return await prisma.comments.create({
    data,
  });
}

async function GetCommentsByGameId(gameid: number) {
  return await prisma.comments.findMany({
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

export default commentRepository;
