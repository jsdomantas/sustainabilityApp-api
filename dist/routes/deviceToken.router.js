"use strict";
const express = require('express');
const deviceTokenController = require('../controllers/deviceToken.controller');
const validateFirebaseIdToken = require('../middleware/firebaseAuth');
const deviceTokenRouter = express.Router();
deviceTokenRouter.use(validateFirebaseIdToken);
deviceTokenRouter.post('/', deviceTokenController.saveDeviceToken);
module.exports = deviceTokenRouter;
