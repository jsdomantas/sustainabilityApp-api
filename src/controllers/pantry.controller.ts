import { Request, Response } from "express";
import { getDecodedJwt } from "../utils";
import * as pantryService from '../services/pantry.service';

export const getPantryItems = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const items = await pantryService.getPantryItems(decodedToken?.uid);

    res.json(items);
};

export const createPantryItem = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    await pantryService.createPantryItem(decodedToken?.uid, req.body);

    res.sendStatus(200);
};

export const deletePantryItem = async (req: Request, res: Response) => {
    await pantryService.deletePantryItem(Number(req.params.id));

    res.sendStatus(200);
}