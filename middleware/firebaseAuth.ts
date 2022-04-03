import {NextFunction, Request, Response} from "express";

const admin = require('firebase-admin');

const validateFirebaseIdToken = async (req: Request, res: Response, next: NextFunction) => {
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
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        await admin.auth().verifyIdToken(idToken);
        console.log('everything is ok');
        next();
        return;
    } catch (error) {
        console.log('invalid token');
        res.status(403).send('Unauthorized');
        return;
    }
};

module.exports = validateFirebaseIdToken;