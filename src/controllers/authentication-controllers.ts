import httpStatus from "http-status";
import authenticationService from "../services/authentication-service";
import { Request, Response } from "express";
import { users } from "@prisma/client";
import { SignInType } from "protocols";
import { AuthenticatedRequest } from "middlewares";

export async function SignUpController(req: Request, res: Response) {
  const data = req.body as Omit<users, 'id'>

  try {
    await authenticationService.SignUpService(data);
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    if (err.name === "InvalidEmailError") {
      return res.status(httpStatus.CONFLICT).send(err.message);
    }
  }
}

export async function LoginController(req: Request, res: Response) {
  const { email, password } = req.body as SignInType;

  try {
    const {token, name} = await authenticationService.LoginService(email, password);

    const result = {
      token: token,
      name: name
    }
    return res.status(httpStatus.CREATED).send(result)
  } catch (err) {
    console.log(err);
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED).send({});
    }
  }
}

export async function LogOutController(req: AuthenticatedRequest,res: Response) {
  const { userId } = req;

  try {
    await authenticationService.LogOutService(userId);
    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err)
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED).send({});
    }
  }
}
