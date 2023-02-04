import { CreateCommentControllers, GetCommentsByGameId } from "../controllers/comments-controllers";
import { Router } from "express";
import { validateBody, authenticateToken } from "../middlewares";
import { CreateCommentSchema } from "../schemas/comments-schemas";

const commentsRouter = Router();

commentsRouter.all('/comments/create*', authenticateToken);
commentsRouter.post('/comments/create', validateBody(CreateCommentSchema), CreateCommentControllers);
commentsRouter.get('/comments/:gameid', GetCommentsByGameId);

export {commentsRouter}
