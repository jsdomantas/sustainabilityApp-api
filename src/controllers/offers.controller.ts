import { Request, Response } from "express";
import * as offersService from '../services/offers.service';
import { getDecodedJwt } from "../utils";

export const getStockProducts = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const products = await offersService.getStock(decodedToken?.uid);

    res.json(products);
}

export const getAllOffers = async (req: Request, res: Response) => {

    const { lat, lon, query } = req.query;

    const allOffers = await offersService.getAllAvailableOffers({ latitude: lat, longitude: lon, searchQuery: query });

    res.json(allOffers);
}

export const getOffer = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        res.sendStatus(400);
    }

    const offer = await offersService.getOffer(Number(id));

    res.json(offer);
}

export const getCreatedOffers = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const offers = await offersService.getCreatedOffers(decodedToken?.uid);

    res.json(offers);
}

export const getCreatedOffer = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);
    if (!req.params.id) {
        res.sendStatus(400);
    }

    const offer = await offersService.getCreatedOffer(decodedToken?.uid, Number(req.params.id));

    console.log(offer);

    res.json(offer);
}

export const createOffer = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    await offersService.createOffer(req.body, decodedToken?.uid);

    res.sendStatus(200);
}

export const handleOfferAction = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    if (req.body.actionType === 'reserve') {
        await offersService.reserveOffer(decodedToken?.uid, Number(req.params.id));
    } else if (req.body.actionType === 'complete') {
        await offersService.pickupOffer(Number(req.params.id));
    } else {
        res.sendStatus(400);
    }

    res.sendStatus(200);
}

export const getUserOffersHistory = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const history = await offersService.getUserOffersHistory(decodedToken?.uid);

    res.json(history);
}

export const createReview = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const { receiverId, offerId, review } = req.body;

    await offersService.createReview(decodedToken?.uid, Number(receiverId), Number(offerId), review);

    res.sendStatus(200);
}