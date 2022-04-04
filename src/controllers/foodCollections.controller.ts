import { Request, Response } from "express";

const foodCollectionService = require('../services/foodCollections.service');

const saveFoodCollection = async (req: Request, res: Response) => {
    const foodCollection = req.body;

    await foodCollectionService.createFoodCollection(foodCollection);

    res.sendStatus(200);
};

const getAllFoodCollections = async (req: Request, res: Response) => {
    const foodCollections = await foodCollectionService.getAllFoodCollections();

    res.json(foodCollections);
};

const getFoodCollection = async (req: Request, res: Response) => {
    const foodCollection = await foodCollectionService.getFoodCollection(req.params.id);

    res.json(foodCollection);
};


module.exports = {
    saveFoodCollection,
    getAllFoodCollections,
    getFoodCollection,
}