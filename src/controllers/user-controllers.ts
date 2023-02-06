import httpStatus from "http-status";
import { Response } from "express";
import UserInfoService from "../services/user-info-service";
import { AuthenticatedRequest } from "../middlewares";
import { UserInfoBody } from "../protocols";

export async function CreateUserInfoController(
  req: AuthenticatedRequest,
  res: Response
) {
  const data = req.body as UserInfoBody;
  const { token } = req;

  try {
    await UserInfoService.CreateUserInfo(data, token);
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function GetUserInfoController(
  req: AuthenticatedRequest,
  res: Response
) {
  const { token } = req;
  console.log(req)

  try {
    const result = await UserInfoService.GetUserInfo(token);
    console.log(result)
    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    console.log(err);
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
