import { Request, Response } from "express";
import { UserData } from "../types";
import admin from 'firebase-admin';

import * as authService from '../services/auth.service';

export const signUp = async (req: Request, res: Response) => {
    const userData: UserData = req.body;

    const createdUser = await authService.createUser(userData.uid, userData.email, userData.isBusinessAccount ? 'business' : 'basic');

    if (userData.isBusinessAccount) {
        await authService.createBusinessUser(userData, createdUser.id);
    } else {
        await authService.createBasicUser();
    }

    res.sendStatus(200);
}

export const getProfile = async (req: Request, res: Response)=> {
    const jwt = req.headers.authorization?.split('Bearer ')[1];

    if (jwt != null) {
        const decodedJwt = await admin.auth().verifyIdToken(jwt);

        const user = await authService.getUserProfile(decodedJwt.uid);
        res.json(user);
    } else {
        res.sendStatus(403);
    }
}