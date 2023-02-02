import { notFoundError, unauthorizedError } from "../../errors";
import authenticationRepository from "../../repositories/authentication-repository";
import userRepository from "../../repositories/user-repository";
import { teams, playerSearch, PlayerStats } from "../../protocols";
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
  const filter = result.filter((item) => item.LastName === correct);
  if (!filter) {
    throw notFoundError();
  }
  return filter;
}

async function PlayerStatsService(gameid: string, team: string) {
  const result: PlayerStats[] = await GamesUtils.PlayerStatsByGameId(gameid);
  if (!result) {
    throw notFoundError();
  }
  const filter = result.filter((item) => item.team.nickname === team);
  return filter;
}

const GamesService = {
  ChooseTeamsService,
  ChoosePlayersService,
  PlayerStatsService,
};

export default GamesService;
