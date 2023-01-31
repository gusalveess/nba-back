import { Router } from "express";
import { authenticationRouter } from "./authentication-router";
import { gamesRouter } from "./games-router";
import { commentsRouter } from "./comments-router";

const router = Router();

router.use(authenticationRouter);
router.use(gamesRouter);
router.use(commentsRouter);

export default router;