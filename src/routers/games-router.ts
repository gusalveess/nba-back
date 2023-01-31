import { Router } from "express";
import { validateBody, authenticateToken} from "../middlewares";
import { GamesPerDateControllers, TeamsControllers, SearchPlayerControllers, GamesInLiveControllers } from "../controllers/games-controllers";
import { GameDateSchema } from "../schemas/games-schemas";

const gamesRouter = Router();

gamesRouter.get('/games/date', validateBody(GameDateSchema), GamesPerDateControllers);
gamesRouter.get('/games/live', GamesInLiveControllers)
.all("/choose*", authenticateToken);
gamesRouter.get('/choose/teams', TeamsControllers);
gamesRouter.get('/choose/:search', SearchPlayerControllers)


export {gamesRouter}