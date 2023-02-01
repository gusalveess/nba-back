import { Router } from "express";
import { validateBody, authenticateToken} from "../middlewares";
import { CreateUserInfoController, GetUserInfoController} from "../controllers/user-controllers";
import { UserInfoSchema } from "../schemas/user-schema";

const userRouter = Router();

userRouter.all('/user*', authenticateToken);
userRouter.post('/user/create', validateBody(UserInfoSchema), CreateUserInfoController);
userRouter.get('/user/my', GetUserInfoController)


export {userRouter}