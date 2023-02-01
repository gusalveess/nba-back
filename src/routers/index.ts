import { Router } from "express";
import { authenticationRouter } from "./authentication-router";
import { gamesRouter } from "./games-router";
import { commentsRouter } from "./comments-router";
import { userRouter } from "./user-router";

const router = Router();

router.use(authenticationRouter);
router.use(gamesRouter);
router.use(commentsRouter);
router.use(userRouter);

export default router;