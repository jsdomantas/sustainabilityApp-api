import { Request, Response } from "express";
const deviceTokenService = require('../services/deviceToken.service');

const saveDeviceToken = async (req: Request, res: Response) => {
    res.sendStatus(200);

    const deviceToken = req.body.deviceToken;
    const firebaseUserId = req.body.userAuthId;

    await deviceTokenService.saveDeviceToken(deviceToken, firebaseUserId);

    res.sendStatus(200);
}

module.exports = {
    saveDeviceToken,
}