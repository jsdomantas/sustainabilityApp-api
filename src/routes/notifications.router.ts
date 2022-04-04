const express = require('express');
const notificationsController = require('../controllers/notifications.controller');

const notificationsRouter = express.Router();

notificationsRouter.post('/', notificationsController.sendBackgroundPushNotification);

module.exports = notificationsRouter;

export {};