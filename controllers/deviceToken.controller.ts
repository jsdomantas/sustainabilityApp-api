import {Request, Response} from "express";

const prismaClient = require('./../prisma/prismaClient');

const saveDeviceToken = async (req: Request, res: Response) => {
    res.sendStatus(200);

    // const deviceToken = req.body.deviceToken;
    //
    // await prismaClient.deviceToken.create({
    //     data: {
    //         token: deviceToken,
    //         user: {
    //             connect: {
    //                 firebaseUserId: req.body.userAuthId,
    //             }
    //         }
    //     }
    // })
    //
    // res.sendStatus(200);
}

module.exports = {
    saveDeviceToken,
}