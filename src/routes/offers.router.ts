import express from "express";
import * as offersController from '../controllers/offers.controller';

const offersRouter = express.Router();

offersRouter.get('/stock', offersController.getStockProducts);
offersRouter.post('/', offersController.createOffer);

export default offersRouter;