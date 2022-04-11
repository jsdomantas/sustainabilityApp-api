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

export const getUserProfile = async (firebaseAuthId: string) => {
    const user = await prismaClient.user.findFirst({
        where: { firebaseUserId: firebaseAuthId },
    })

    if (!user) return null;

    let clientOrBusinessOwner;
    if (user.role === 'business') {
        clientOrBusinessOwner = await prismaClient.businessOwner.findFirst({
            where: { userId: user.id },
            select: {
                userId: false,
                id: true,
                latitude: true,
                longitude: true,
                title: true,
                usualPickupTime: true,
                user: {
                    select: {
                        role: true,
                    }
                }
            },
        })
    } else {
        clientOrBusinessOwner = await prismaClient.customer.findFirst({
            where: { userId: user.id },
        })
    }

    return clientOrBusinessOwner;
}