import admin from "firebase-admin";
import prismaClient from "./configs/prisma.config";

export const getDecodedJwt = async (token: string | undefined) => {
    if (!token) return null;

    const parsedToken = token.split('Bearer ')[1];
    return await admin.auth().verifyIdToken(parsedToken);
}

export const getUser = async (firebaseAuthId: string | undefined) => {
    if (!firebaseAuthId) return null;

    return await prismaClient.user.findFirst({ where: { firebaseUserId: firebaseAuthId } });
}