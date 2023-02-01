import { Request, Response } from "express";
import GamesUtils from "../utils/games-utils";
import httpStatus from "http-status";
import { date, data } from "../protocols";
import { AuthenticatedRequest } from "../middlewares";
import GamesService from "../services/games-service";

export async function GamesInLiveControllers(req: Request, res: Response) {
  try {
    const result: data[] = await GamesUtils.GamesInLive();
    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function GamesPerDateControllers(req: Request, res: Response) {
  const { date } = req.body as date;

  try {
    const result: data[] = await GamesUtils.GamesPerDate(date);
    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function TeamsControllers(
  req: AuthenticatedRequest,
  res: Response
) {
  const { token } = req;

  try {
    const result = await GamesService.ChooseTeamsService(token);
    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    console.log(err);
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function SearchPlayerControllers(
  req: AuthenticatedRequest,
  res: Response
) {
  const { search } = req.params;
  const { token } = req;
  try {
    const result = await GamesService.ChoosePlayersService(token, search);
    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    console.log(err);
    if (err.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
