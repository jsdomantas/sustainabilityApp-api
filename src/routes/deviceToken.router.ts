const express = require('express');
const deviceTokenController = require('../controllers/deviceToken.controller');

const deviceTokenRouter = express.Router();

deviceTokenRouter.post('/', deviceTokenController.saveDeviceToken);

module.exports = deviceTokenRouter;

export {};