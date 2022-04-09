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
const express = require('express');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const morgan = require('morgan');
const serviceAccount = require('./../sustainability-app-6f466-firebase-adminsdk-jt1hv-27b1827892.json');
const validateFirebaseIdToken = require('./src/middleware/firebaseAuth');
const deviceTokenRouter = require('./src/routes/deviceToken.router');
const ingredientsRouter = require('./src/routes/ingredients.router');
const authRouter = require('./src/routes/auth.router');
const foodCollectionRouter = require('./src/routes/foodCollections.router');
dotenv.config();
const app = express();
app.use(morgan('combined'));
app.use(express.json());
// app.use(validateFirebaseIdToken)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
app.use('/auth', authRouter);
app.use('/deviceToken', deviceTokenRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/foodCollection', foodCollectionRouter);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
app.listen(process.env.PORT, () => {
    console.log('starting server ...');
});
