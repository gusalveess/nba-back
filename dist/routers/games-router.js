"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const games_controllers_1 = require("../controllers/games-controllers");
const gamesRouter = (0, express_1.Router)();
exports.gamesRouter = gamesRouter;
gamesRouter.get("/games/date/:DateGame", games_controllers_1.GamesPerDateControllers);
gamesRouter.get('/standings/:conference', games_controllers_1.StandingsController);
gamesRouter
    .get("/games/live", games_controllers_1.GamesInLiveControllers)
    .all("/choose*", middlewares_1.authenticateToken);
gamesRouter.get("/choose/teams", games_controllers_1.TeamsControllers);
gamesRouter.get("/choose/:search", games_controllers_1.SearchPlayerControllers);
gamesRouter.get("/games/:gameid", games_controllers_1.PlayerStatsControllers);
gamesRouter.get("/games/stats/:id", games_controllers_1.GameStatsControllers);
