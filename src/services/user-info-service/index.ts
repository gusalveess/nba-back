import userRepository from "../../repositories/user-repository";
import authenticationRepository from "../../repositories/authentication-repository";
import { conflictError, unauthorizedError } from "../../errors";
import { UserInfoBody } from "../../protocols";

async function CreateUserInfo(data: UserInfoBody, token: string) {
  const Auth = await authenticationRepository.findSessionByToken(token);
  if (!Auth) {
    throw unauthorizedError();
  }
  const verifyChoose = await userRepository.GetUserInfoByUserId(Auth.userid);
  if (verifyChoose) {
    throw conflictError("Conflict Error");
  }
  const dataCreate = {
    userid: Auth.userid,
    teamid: data.teamid,
    teamname: data.teamname,
    logoteam: data.logoteam,
    playerid: data.playerid,
    playername: data.playername,
    playerpicture: data.playerpicture,
  };

  return await userRepository.CreateUserInfo(dataCreate);
}

async function GetUserInfo(token: string) {
  const Auth = await authenticationRepository.findSessionByToken(token);
  if (!Auth) {
    throw unauthorizedError();
  }
  const result = await userRepository.GetUserInfoByUserId(Auth.userid);
  return result
}

const UserInfoService = {
  CreateUserInfo,
  GetUserInfo,
};

export default UserInfoService;
