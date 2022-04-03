import {Request, Response} from "express";

const express = require('express');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const util = require('util');
const morgan = require('morgan');
const validateFirebaseIdToken = require('./middleware/firebaseAuth');
const prismaClient = require('./prisma/prismaClient');
const deviceTokenRouter = require('./routes/deviceToken.router');

dotenv.config();

const serviceAccount = require('./../sustainability-app-6f466-firebase-adminsdk-jt1hv-27b1827892.json');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
// app.use(validateFirebaseIdToken)
const port = process.env.PORT;

const delay = util.promisify(setTimeout);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

app.use('/deviceToken', deviceTokenRouter);

const sendPushNotification = async (tokens: Array<string>)=> {
    console.log(tokens);

    return admin.messaging().sendToDevice(tokens,{
        notification: {
            body: 'Test body',
            title: 'Test title',
        },
        data: {
            type: 'alarmNotification',
        },
    })
}

app.get('/', async (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.post('/signup', async (req: Request, res: Response) => {
    const userData = req.body;

    await prismaClient.user.create({
        data: {
            firebaseUserId: userData.user.uid,
            email: userData.user.email,
        }
    })
})

app.get('/ingredients', async (req: Request, res: Response) => {
    const ingredients = await prismaClient.ingredient.findMany();

    res.json(ingredients);
})

app.post('/foodCollection', async (req: Request, res: Response) => {
    const foodCollection = req.body;

    await prismaClient.foodCollection.create({
        data: {
            title: foodCollection.title,
            latitude: foodCollection.coordinates.latitude,
            longitude: foodCollection.coordinates.longitude,
            description: foodCollection.description,
            neededIngredients: {
                connect: foodCollection.neededIngredients.map((ingredientId: number) => ({ id: ingredientId})),
            },
            isActive: true,
        }
    });

    await delay(5000);

    const tokens = await prismaClient.deviceToken.findMany();
    await sendPushNotification(tokens.map(t => t.token));

    res.sendStatus(200);
})

app.get('/foodCollection', async (req: Request, res: Response) => {
    const foodCollections = await prismaClient.foodCollection.findMany({
        include: {
            neededIngredients: true,
        }
    });

    res.json(foodCollections);
})

app.get('/foodCollection/:id', async (req: Request, res: Response) => {
    const foodCollections = await prismaClient.foodCollection.findFirst({
        where: { id: Number(req.params.id) },
        include: {
            neededIngredients: true,
        }
    });

    res.json(foodCollections);
})

app.post('/alarm', async (req: Request, res: Response) => {
    await delay(5000);
    await sendPushNotification(req.body.token);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log('starting server ...');
})