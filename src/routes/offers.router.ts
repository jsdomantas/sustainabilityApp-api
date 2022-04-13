import express from "express";
import * as offersController from '../controllers/offers.controller';

const offersRouter = express.Router();

offersRouter.get('/stock', offersController.getStockProducts);
offersRouter.get('/created', offersController.getCreatedOffers);
offersRouter.get('/created/:id', offersController.getCreatedOffer);
offersRouter.get('/', offersController.getAllOffers)
offersRouter.get('/:id', offersController.getOffer)
offersRouter.post('/', offersController.createOffer);

export default offersRouter;