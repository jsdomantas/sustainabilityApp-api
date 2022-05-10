import { BusinessUserData, CustomerUserData } from "../types";

import prismaClient from '../configs/prisma.config';

export const createUser = async (firebaseUserId: string, email: string, role: 'basic' | 'business') => {
    return await prismaClient.user.create({
        data: {
            firebaseUserId: firebaseUserId,
            email: email,
            role,
        }
    })
}

export const createBasicUser = async (userData: CustomerUserData, userId: number) => {
    await prismaClient.customer.create({
        data: {
            fullName: userData.name,
            phoneNumber: userData.phoneNumber,
            photoUrl: userData.photoUrl,
            familyCardNumber: userData.familyCardNumber,
            // preferredCategories: {
            //     connect: userData.preferredFoodCategories.map(category => ({ id: category.value }))
            // },
            user: {
                connect: {
                    id: userId,
                }
            }
        }
    })
}

export const createBusinessUser = async (userData: BusinessUserData, userId: number) => {
    await prismaClient.businessOwner.create({
        data: {
            title: userData.name,
            latitude: userData.coordinates.latitude,
            longitude: userData.coordinates.longitude,
            usualPickupTime: userData.pickupTime,
            phoneNumber: userData.phoneNumber,
            products: {
                connect: userData.products.map(product => ({ id: Number(product.value) }))
            },
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