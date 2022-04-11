import { Request, Response } from "express";

const notificationsService = require('../services/notifications.service');
import prismaClient from "../configs/prisma.config";

const sendBackgroundPushNotification = async (req: Request, res: Response) => {
    const tokens = await prismaClient.deviceToken.findMany();

    await notificationsService.sendBackgroundPushNotifications(tokens);
    res.sendStatus(200);
}

module.exports = {
    sendBackgroundPushNotification,
}