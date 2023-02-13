"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingsController = exports.GameStatsControllers = exports.PlayerStatsControllers = exports.SearchPlayerControllers = exports.TeamsControllers = exports.GamesPerDateControllers = exports.GamesInLiveControllers = void 0;
const games_utils_1 = __importDefault(require("../utils/games-utils"));
const http_status_1 = __importDefault(require("http-status"));
const games_service_1 = __importDefault(require("../services/games-service"));
async function GamesInLiveControllers(req, res) {
    try {
        const result = await games_utils_1.default.GamesInLive();
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.GamesInLiveControllers = GamesInLiveControllers;
async function GamesPerDateControllers(req, res) {
    const { DateGame } = req.params;
    try {
        const result = await games_utils_1.default.GamesPerDate(DateGame);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.GamesPerDateControllers = GamesPerDateControllers;
async function TeamsControllers(req, res) {
    const { token } = req;
    try {
        const result = await games_service_1.default.ChooseTeamsService(token);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.TeamsControllers = TeamsControllers;
async function SearchPlayerControllers(req, res) {
    const { search } = req.params;
    const { token } = req;
    try {
        const result = await games_service_1.default.ChoosePlayersService(token, search);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "UnauthorizedError") {
            return res.sendStatus(http_status_1.default.UNAUTHORIZED);
        }
        if (err.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.SearchPlayerControllers = SearchPlayerControllers;
async function PlayerStatsControllers(req, res) {
    const { gameid } = req.params;
    try {
        const result = await games_service_1.default.PlayerStatsService(gameid);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.PlayerStatsControllers = PlayerStatsControllers;
async function GameStatsControllers(req, res) {
    const { id } = req.params;
    try {
        const result = await games_service_1.default.GameStatsService(id);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.GameStatsControllers = GameStatsControllers;
async function StandingsController(req, res) {
    const { conference } = req.params;
    try {
        const result = await games_service_1.default.StandingsService(conference);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (err) {
        console.log(err);
        if (err.name === "NotFoundError") {
            return res.sendStatus(http_status_1.default.NOT_FOUND);
        }
        return res.sendStatus(http_status_1.default.INTERNAL_SERVER_ERROR);
    }
}
exports.StandingsController = StandingsController;
