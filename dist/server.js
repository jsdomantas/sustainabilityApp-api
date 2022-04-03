"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express = require('express');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const util = require('util');
const morgan = require('morgan');
const validateFirebaseIdToken = require('./middleware/firebaseAuth');
dotenv.config();
const serviceAccount = require('./../sustainability-app-6f466-firebase-adminsdk-jt1hv-27b1827892.json');
const app = express();
const prismaClient = new client_1.PrismaClient();
app.use(morgan('combined'));
app.use(express.json());
app.use(validateFirebaseIdToken);
const port = process.env.PORT;
const delay = util.promisify(setTimeout);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const sendPushNotification = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return admin.messaging().send({
        token,
        notification: {
            body: 'Test body',
            title: 'Test title',
        },
        data: {
            type: 'alarmNotification',
        },
    });
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    yield prismaClient.user.create({
        data: {
            firebaseUserId: userData.user.uid,
            email: userData.user.email,
        }
    });
}));
app.get('/ingredients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingredients = yield prismaClient.ingredient.findMany();
    res.json(ingredients);
}));
app.post('/foodCollection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodCollection = req.body;
    yield prismaClient.foodCollection.create({
        data: {
            title: foodCollection.title,
            latitude: foodCollection.coordinates.latitude,
            longitude: foodCollection.coordinates.longitude,
            description: foodCollection.description,
            neededIngredients: {
                connect: foodCollection.neededIngredients.map((ingredientId) => ({ id: ingredientId })),
            },
            isActive: true,
        }
    });
    res.sendStatus(200);
}));
app.get('/foodCollection', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodCollections = yield prismaClient.foodCollection.findMany({
        include: {
            neededIngredients: true,
        }
    });
    res.json(foodCollections);
}));
app.get('/foodCollection/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodCollections = yield prismaClient.foodCollection.findFirst({
        where: { id: Number(req.params.id) },
        include: {
            neededIngredients: true,
        }
    });
    res.json(foodCollections);
}));
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("test 2");
}));
app.post('/alarm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(5000);
    yield sendPushNotification(req.body.token);
    res.sendStatus(200);
}));
app.listen(port, () => {
    console.log('starting server ...');
});
