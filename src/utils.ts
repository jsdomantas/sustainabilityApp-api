import admin from "firebase-admin";

export const getDecodedJwt = async (token: string | undefined) => {
    if (!token) return null;

    const parsedToken = token.split('Bearer ')[1];
    return await admin.auth().verifyIdToken(parsedToken);
}