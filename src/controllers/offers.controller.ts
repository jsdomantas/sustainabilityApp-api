import { Request, Response } from "express";
import * as offersService from '../services/offers.service';
import { getDecodedJwt } from "../utils";
import prismaClient from "../configs/prisma.config";
import * as notificationsService from '../services/notifications.service';
import * as recombeeService from '../services/recombee.service';

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
    const decodedToken = await getDecodedJwt(req.headers?.authorization);
    const id = req.params.id;

    if (!id) {
        res.sendStatus(400);
    }

    const offer = await offersService.getOffer(Number(id));

    const offerProducts = offer?.products.map(product => product.id);
    if (offerProducts) {
        await recombeeService.addDetailViewInteraction(decodedToken?.uid, offerProducts);
    }

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

    const offer = await offersService.createOffer(req.body, decodedToken?.uid);
    console.log(offer);

    const usersWithFamilyCards = await prismaClient.customer.findMany({ where: { familyCardNumber: { contains: '1' } } });
    const usersWithFamilyCardsDeviceTokens = await prismaClient.deviceToken.findMany({ where: { user: { id: { in: usersWithFamilyCards.map(user => user.userId) } } } });

    // const usersWithoutFamilyCardsDeviceTokens = await prismaClient.deviceToken.findMany({ where: { NOT: { user: { id: { in: usersWithFamilyCards.map(user => user.userId) } } } } });

    await notificationsService.sendBackgroundPushNotifications(usersWithFamilyCardsDeviceTokens.map(obj => obj.token), offer?.id!);

    // setTimeout(async () => {
    //     await notificationsService.sendBackgroundPushNotifications(usersWithoutFamilyCardsDeviceTokens.map(obj => obj.token), offer?.id!);
    // }, 1000 * 10);

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

export const getRecommendedOffers = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const reccs = await recombeeService.getProductRecommendations(decodedToken?.uid);

    const offersByRecommendedProducts = await offersService.getRecommendedOffers(reccs.recomms);

    res.json(offersByRecommendedProducts);
}