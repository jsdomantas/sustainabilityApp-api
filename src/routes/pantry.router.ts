import express from "express";
import * as pantryController from '../controllers/pantry.controller';

const pantryRouter = express.Router();

pantryRouter.get('/', pantryController.getPantryItems);
pantryRouter.post('/', pantryController.createPantryItem);

export default pantryRouter;
