
const express = require('express');
const foodCollectionsController = require('../controllers/foodCollections.controller');

const foodCollectionsRouter = express.Router();

foodCollectionsRouter.post('/', foodCollectionsController.saveFoodCollection);
foodCollectionsRouter.get('/', foodCollectionsController.getAllFoodCollections);
foodCollectionsRouter.get('/:id', foodCollectionsController.getFoodCollection);

module.exports = foodCollectionsRouter;

export {};