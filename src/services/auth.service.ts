import { UserData } from "../types";

import prismaClient from '../configs/prisma.config';

export const createUser = async (firebaseUserId: string, email: string) => {
    return await prismaClient.user.create({
        data: {
            firebaseUserId: firebaseUserId,
            email: email,
        }
    })
}

export const createBasicUser = async () => {
    //
}

export const createBusinessUser = async (userData: UserData, userId: number) => {
    await prismaClient.businessOwner.create({
        data: {
            title: userData.name,
            latitude: userData.coordinates.latitude,
            longitude: userData.coordinates.longitude,
            usualPickupTime: userData.pickupTime,
            user: {
                connect: {
                    id: userId,
                }
            }
        },
    })
}