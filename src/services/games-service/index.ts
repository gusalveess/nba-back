import { notFoundError, unauthorizedError } from "../../errors";
import authenticationRepository from "../../repositories/authentication-repository";
import userRepository from "../../repositories/user-repository";
import { teams, playerSearch, PlayerStats, Standing } from "../../protocols";
import GamesUtils from "../../utils/games-utils";

async function ChooseTeamsService(token: string) {
  const Auth = await authenticationRepository.findSessionByToken(token);
  if (!Auth) {
    throw unauthorizedError();
  }
  const verifyChoose = await userRepository.GetUserInfoByUserId(Auth.userid);
  const result: teams[] = await GamesUtils.Teams();
  const nba = result.filter((item) => item.nbaFranchise === true);
  const filter = nba.filter((item) => item.nickname != "Team Stephen A");
  return filter;
}

async function ChoosePlayersService(token: string, search: string) {
  const Auth = await authenticationRepository.findSessionByToken(token);
  if (!Auth) {
    throw unauthorizedError();
  }
  const verifyChoose = await userRepository.GetUserInfoByUserId(Auth.userid);
  const correct = GamesUtils.Correct(search);
  const result: playerSearch[] = await GamesUtils.SearchPlayer();
  const filter = result.filter((item) => item.LastName === correct);
  if (!filter) {
    throw notFoundError();
  }
  return filter;
}

async function PlayerStatsService(gameid: string) {
  const result: PlayerStats[] = await GamesUtils.PlayerStatsByGameId(gameid);
  if (!result) {
    throw notFoundError();
  }
  return result;
}

async function GameStatsService(id: string) {
  const result = await GamesUtils.GameStats(id);
  if (!result) {
    throw notFoundError();
  }
  return result;
}

async function StandingsService(conference: string) {
  const result: Standing[] = await GamesUtils.Standings(conference);
  if (!result) {
    throw notFoundError();
  }
  const filter = result.sort((a, b) => a.conference.rank - b.conference.rank)
  return filter;
}

const GamesService = {
  ChooseTeamsService,
  ChoosePlayersService,
  PlayerStatsService,
  GameStatsService,
  StandingsService
};

export default GamesService;
