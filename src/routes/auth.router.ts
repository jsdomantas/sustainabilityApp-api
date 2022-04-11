import express from 'express';
import * as authController from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.get('/profile', authController.getProfile);

module.exports = authRouter;

export {};