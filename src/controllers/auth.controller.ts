import { Request, Response } from "express";

const authService = require('../services/auth.service');

const signUp = async (req: Request, res: Response) => {
    const userData = req.body;

    await authService.createUser(userData.user.uid, userData.user.email);
    res.sendStatus(200);
}

module.exports = {
    signUp,
}