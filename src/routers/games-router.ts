import { Router } from "express";
import { authenticateToken } from "../middlewares";
import {
  GamesPerDateControllers,
  TeamsControllers,
  SearchPlayerControllers,
  GamesInLiveControllers,
  PlayerStatsControllers,
  GameStatsControllers,
  StandingsController,
} from "../controllers/games-controllers";

const gamesRouter = Router();

gamesRouter.get("/games/date/:DateGame", GamesPerDateControllers);
gamesRouter.get('/standings/:conference', StandingsController);
gamesRouter
  .get("/games/live", GamesInLiveControllers)
  .all("/choose*", authenticateToken);
gamesRouter.get("/choose/teams", TeamsControllers);
gamesRouter.get("/choose/:search", SearchPlayerControllers);
gamesRouter.get("/games/:gameid", PlayerStatsControllers);
gamesRouter.get("/games/stats/:id", GameStatsControllers);

export { gamesRouter };
