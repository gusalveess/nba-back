import { prisma } from "../../config";
import { Prisma } from "@prisma/client";

type createUserInfo = Omit<Prisma.userInfoUncheckedCreateInput, "id">;

async function CreateUserInfo(data: createUserInfo) {
  return await prisma.userInfo.create({
    data,
  });
}

async function GetUserInfoByUserId(userid: number) {
  return await prisma.userInfo.findMany({
    where: {
      userid: userid,
    },
  });
}

const userRepository = {
  CreateUserInfo,
  GetUserInfoByUserId,
};

export default userRepository;
