import * as deviceTokenController from '../controllers/deviceToken.controller';
import express from "express";

const deviceTokenRouter = express.Router();

deviceTokenRouter.post('/', deviceTokenController.saveDeviceToken);

export default deviceTokenRouter;