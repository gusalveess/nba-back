import { Router } from "express";
import { authenticationRouter } from "./authentication-router";
import { gamesRouter } from "./games-router";

const router = Router();

router.use(authenticationRouter);
router.use(gamesRouter)

export default router;