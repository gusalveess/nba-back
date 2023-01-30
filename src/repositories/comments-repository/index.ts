import { prisma } from "config";
import { Prisma } from "@prisma/client";

type commentData = Omit<Prisma.commentsUncheckedCreateInput, "id">;

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
  });
}

const commentRepository = {
  CreateComment,
  GetCommentsByGameId,
};

export default commentRepository;
