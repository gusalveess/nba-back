"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const authentication_repository_1 = __importDefault(require("../../repositories/authentication-repository"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository"));
const games_utils_1 = __importDefault(require("../../utils/games-utils"));
async function ChooseTeamsService(token) {
    const Auth = await authentication_repository_1.default.findSessionByToken(token);
    if (!Auth) {
        throw (0, errors_1.unauthorizedError)();
    }
    const verifyChoose = await user_repository_1.default.GetUserInfoByUserId(Auth.userid);
    const result = await games_utils_1.default.Teams();
    const nba = result.filter((item) => item.nbaFranchise === true);
    const filter = nba.filter((item) => item.nickname != "Team Stephen A");
    return filter;
}
async function ChoosePlayersService(token, search) {
    const Auth = await authentication_repository_1.default.findSessionByToken(token);
    if (!Auth) {
        throw (0, errors_1.unauthorizedError)();
    }
    const verifyChoose = await user_repository_1.default.GetUserInfoByUserId(Auth.userid);
    const correct = games_utils_1.default.Correct(search);
    const result = await games_utils_1.default.SearchPlayer();
    const filter = result.filter((item) => item.LastName === correct);
    if (!filter) {
        throw (0, errors_1.notFoundError)();
    }
    return filter;
}
async function PlayerStatsService(gameid) {
    const result = await games_utils_1.default.PlayerStatsByGameId(gameid);
    if (!result) {
        throw (0, errors_1.notFoundError)();
    }
    return result;
}
async function GameStatsService(id) {
    const result = await games_utils_1.default.GameStats(id);
    if (!result) {
        throw (0, errors_1.notFoundError)();
    }
    return result;
}
async function StandingsService(conference) {
    const result = await games_utils_1.default.Standings(conference);
    if (!result) {
        throw (0, errors_1.notFoundError)();
    }
    const filter = result.sort((a, b) => a.conference.rank - b.conference.rank);
    return filter;
}
const GamesService = {
    ChooseTeamsService,
    ChoosePlayersService,
    PlayerStatsService,
    GameStatsService,
    StandingsService
};
exports.default = GamesService;
