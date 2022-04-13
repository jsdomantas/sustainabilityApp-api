import express from "express";
import * as offersController from '../controllers/offers.controller';

const offersRouter = express.Router();

offersRouter.get('/stock', offersController.getStockProducts);
offersRouter.get('/created', offersController.getCreatedOffers);
offersRouter.get('/created/:id', offersController.getCreatedOffer);
offersRouter.get('/', offersController.getAllOffers);
offersRouter.post('/', offersController.createOffer);
offersRouter.get('/details/:id', offersController.getOffer);
offersRouter.post('/details/:id/actions', offersController.handleOfferAction);
offersRouter.get('/history', offersController.getUserOffersHistory);

export default offersRouter;