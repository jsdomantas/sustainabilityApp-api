import express, { Request, Response } from "express";
import offersRouter from "./src/routes/offers.router";
import admin from "firebase-admin";

const morgan = require('morgan');
const serviceAccount = require('./../sustainability-app-6f466-firebase-adminsdk-jt1hv-27b1827892.json');
const validateFirebaseIdToken = require('./src/middleware/firebaseAuth');
const ingredientsRouter = require('./src/routes/ingredients.router');
import deviceTokenRouter from './src/routes/deviceToken.router';
import authRouter from './src/routes/auth.router';
import pantryRouter from "./src/routes/pantry.router";
const foodCollectionRouter = require('./src/routes/foodCollections.router');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
// app.use(validateFirebaseIdToken)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

app.use('/auth', authRouter);
app.use('/deviceToken', deviceTokenRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/foodCollection', foodCollectionRouter);
app.use('/offers', offersRouter);
app.use('/pantry', pantryRouter);

app.get('/', async (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.listen(8000, () => {
    console.log('starting server ...');
})

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });