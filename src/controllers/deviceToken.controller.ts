import { Request, Response } from "express";
import * as deviceTokenService from '../services/deviceToken.service';
import { getDecodedJwt } from "../utils";

export const saveDeviceToken = async (req: Request, res: Response) => {
    const deviceToken = req.body.token;
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    await deviceTokenService.saveDeviceToken(deviceToken, decodedToken?.uid);

    res.sendStatus(200);
}