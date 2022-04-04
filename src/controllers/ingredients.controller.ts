import { Request, Response } from "express";

const ingredientsService = require('../services/ingredients.service');

const getAllIngredients = async (req: Request, res: Response) => {
    const ingredients = await ingredientsService.getIngredients();
    res.json(ingredients);
}

module.exports = {
    getAllIngredients,
}