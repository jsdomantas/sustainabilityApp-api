import express from "express";
import * as offersController from '../controllers/offers.controller';

const offersRouter = express.Router();

offersRouter.get('/', offersController.getStockProducts);

export default offersRouter;