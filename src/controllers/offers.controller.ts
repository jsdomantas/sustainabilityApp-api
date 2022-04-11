import { Request, Response } from "express";
import * as offersService from '../services/offers.service';
import { getDecodedJwt } from "../utils";

export const getStockProducts = async (req: Request, res: Response) => {
    const decodedToken = await getDecodedJwt(req.headers?.authorization);

    const products = await offersService.getStock(decodedToken?.uid);

    console.log(products);
    res.json(products);
}