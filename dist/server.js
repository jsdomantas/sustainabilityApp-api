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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offers_router_1 = __importDefault(require("./src/routes/offers.router"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// const dotenv = require('dotenv');
const morgan = require('morgan');
const serviceAccount = require('./../sustainability-app-6f466-firebase-adminsdk-jt1hv-27b1827892.json');
const validateFirebaseIdToken = require('./src/middleware/firebaseAuth');
const deviceTokenRouter = require('./src/routes/deviceToken.router');
const ingredientsRouter = require('./src/routes/ingredients.router');
const auth_router_1 = __importDefault(require("./src/routes/auth.router"));
const pantry_router_1 = __importDefault(require("./src/routes/pantry.router"));
const foodCollectionRouter = require('./src/routes/foodCollections.router');
// dotenv.config();
const app = (0, express_1.default)();
app.use(morgan('combined'));
app.use(express_1.default.json());
// app.use(validateFirebaseIdToken)
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
app.use('/auth', auth_router_1.default);
app.use('/deviceToken', deviceTokenRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/foodCollection', foodCollectionRouter);
app.use('/offers', offers_router_1.default);
app.use('/pantry', pantry_router_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
app.listen(8000, () => {
    console.log('starting server ...');
    console.log('asjkldlkasjd');
});
process.on('uncaughtException', e => {
    console.error(e);
});
process.on('SIGTERM', () => { });
