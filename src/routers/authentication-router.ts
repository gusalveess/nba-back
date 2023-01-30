import { SignUpController, LoginController, LogOutController } from "../controllers/authentication-controllers";
import { validateBody, authenticateToken } from "../middlewares";
import { SignUpSchema, SignInSchema } from "../schemas/authentication-schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-up", validateBody(SignUpSchema), SignUpController);
authenticationRouter.post("/sign-in", validateBody(SignInSchema), LoginController)
.all("/log-out*", authenticateToken);
authenticationRouter.post("/log-out", LogOutController)


export { authenticationRouter };