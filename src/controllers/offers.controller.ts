import { Request, Response } from "express";
import * as offersService from '../services/offers.service';
import { getDecodedJwt } from "../utils";

export const getStockProducts = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const products = await offersService.getStock(decodedToken?.uid);

    res.json(products);
}

export const getAllOffers = async (req: Request, res: Response) => {
    const allOffers = await offersService.getAllOffers();

    res.json(allOffers);
}

export const getOffer = async (req: Request, res: Response) => {
    const id = req.params.id;

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

    const offer = await offersService.getCreatedOffer(decodedToken?.uid, Number(req.params.id));

    console.log(offer);

    res.json(offer);
}

export const createOffer = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    await offersService.createOffer(req.body, decodedToken?.uid);

    res.sendStatus(200);
}