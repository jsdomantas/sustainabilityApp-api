import { Request, Response } from "express";
import { UserData } from "../types";

import * as authService from '../services/auth.service';

const signUp = async (req: Request, res: Response) => {
    const userData: UserData = req.body;

    const createdUser = await authService.createUser(userData.uid, userData.email);

    if (userData.isBusinessAccount) {
        await authService.createBusinessUser(userData, createdUser.id);
    } else {
        await authService.createBasicUser();
    }

    res.sendStatus(200);
}

module.exports = {
    signUp,
}