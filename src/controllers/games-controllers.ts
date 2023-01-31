import { Request, Response } from "express";
import GamesUtils from "../utils/games-utils";
import httpStatus from "http-status";
import { date, data, teams, playerSearch } from "../protocols";
import { AuthenticatedRequest } from "../middlewares";

export async function GamesInLiveControllers(req: Request, res: Response) {
    try {
        const result: data[] = await GamesUtils.GamesInLive();
        return res.status(httpStatus.OK).send(result);
    } catch (err) {
        console.log(err)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function GamesPerDateControllers(req: Request, res: Response) {
    const {date} = req.body as date

    try {
        const result: data[] = await GamesUtils.GamesPerDate(date)
        return res.status(httpStatus.OK).send(result);
    } catch (err) {
        console.log(err)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function TeamsControllers(req: AuthenticatedRequest, res: Response) {
    try {
        const result: teams[] = await GamesUtils.Teams();
        const filter = result.filter(item => item.nbaFranchise === true)
        return res.status(httpStatus.OK).send(filter);
    } catch (err) {
        console.log(err)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function SearchPlayerControllers(req: AuthenticatedRequest, res: Response) {
    const {search} = req.params;
    const correct = GamesUtils.Correct(search);
    try {
        const result: playerSearch[] = await GamesUtils.SearchPlayer();
        const filter = result.filter(item => item.LastName === correct);
        return res.status(httpStatus.OK).send(filter);
    } catch (err) {
        console.log(err)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}