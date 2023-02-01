import { unauthorizedError } from "../../errors";
import authenticationRepository from "../../repositories/authentication-repository";
import userRepository from "../../repositories/user-repository";
import { teams, playerSearch } from "../../protocols";
import GamesUtils from "../../utils/games-utils";

async function ChooseTeamsService(token: string) {
  const Auth = await authenticationRepository.findSessionByToken(token);
  if (!Auth) {
    throw unauthorizedError();
  }
  const verifyChoose = await userRepository.GetUserInfoByUserId(Auth.userid);
  if (verifyChoose) {
    throw unauthorizedError();
  }
  const result: teams[] = await GamesUtils.Teams();
  const filter = result.filter((item) => item.nbaFranchise === true);
  return filter;
}

async function ChoosePlayersService(token: string, search: string) {
    const Auth = await authenticationRepository.findSessionByToken(token);
    if (!Auth) {
      throw unauthorizedError();
    }
    const verifyChoose = await userRepository.GetUserInfoByUserId(Auth.userid);
    if (verifyChoose) {
      throw unauthorizedError();
    }
    const correct = GamesUtils.Correct(search);
    const result: playerSearch[] = await GamesUtils.SearchPlayer();
    const filter = result.filter(item => item.LastName === correct);
    return filter
}

const GamesService = {
    ChooseTeamsService,
    ChoosePlayersService
}

export default GamesService
