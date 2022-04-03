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
const admin = require('firebase-admin');
const validateFirebaseIdToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
        /*
            'No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.'
         */
        res.status(403).send('Unauthorized');
        return;
    }
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }
    try {
        yield admin.auth().verifyIdToken(idToken);
        console.log('everything is ok');
        next();
        return;
    }
    catch (error) {
        console.log('invalid token');
        res.status(403).send('Unauthorized');
        return;
    }
});
module.exports = validateFirebaseIdToken;
