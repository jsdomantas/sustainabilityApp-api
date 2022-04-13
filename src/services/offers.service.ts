import prismaClient from "../configs/prisma.config";

const getUser = async (firebaseAuthId: string | undefined) => {
    if (!firebaseAuthId) return null;

    return await prismaClient.user.findFirst({ where: { firebaseUserId: firebaseAuthId } });
}

export const getStock = async (firebaseAuthId: string | undefined) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const userWithProducts = await prismaClient.businessOwner.findFirst({
        where: { userId: user.id },
        include: {
            products: true,
        }
    })

    return userWithProducts?.products || [];
};

export const getAllAvailableOffers = async () => {
    return await prismaClient.offer.findMany({
        where: { status: 'posted' },
        select: {
            id: true,
            createdAt: true,
            title: true,
            photoUrl: true,
            pickupTime: true,
            businessOwner: {
                select: {
                    title: true
                }
            },
            category: {
                select: {
                    title: true
                }
            }
        }
    });
}

export const getOffer = async (id: number) => {
    return await prismaClient.offer.findFirst({
        where: { id },
        select: {
            id: true,
            createdAt: true,
            title: true,
            description: true,
            photoUrl: true,
            pickupTime: true,
            products: {
                select: {
                    title: true,
                },
            },
            businessOwner: {
                select: {
                    title: true,
                    latitude: true,
                    longitude: true,
                    phoneNumber: true,
                }
            },
            category: {
                select: {
                    title: true,
                }
            }
        }
    })
}

export const getCreatedOffers = async (firebaseAuthId: string | undefined) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const businessOwner = await prismaClient.businessOwner.findFirst({
        where: { userId: user.id },
    });

    if (!businessOwner) return null;

    return await prismaClient.offer.findMany({
        where: { businessOwnerId: businessOwner.id },
    })
}

export const getCreatedOffer = async (firebaseAuthId: string | undefined, offerId: number) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const businessOwner = await prismaClient.businessOwner.findFirst({
        where: { userId: user.id },
    });

    if (!businessOwner) return null;

    return await prismaClient.offer.findFirst({
        where: { id: offerId },
        include: {
            products: true,
        }
    })
}

export const createOffer = async (offerData: any, firebaseAuthId: string | undefined) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const businessOwner = await prismaClient.businessOwner.findFirst({
        where: { userId: user.id },
    });

    if (!businessOwner) return null;

    await prismaClient.offer.create({
        data: {
            title: offerData.name,
            description: offerData.description,
            photoUrl: offerData.photoUrl,
            pickupTime: businessOwner.usualPickupTime,
            latitude: businessOwner.latitude,
            longitude: businessOwner.longitude,
            products: {
                connect: offerData.products.map((product: any) => ({ id: product.value })),
            },
            businessOwner: {
                connect: { id: businessOwner.id },
            }
        }
    })
}

export const reserveOffer = async (firebaseAuthId: string | undefined, offerId: number) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const customer = await prismaClient.customer.findFirst({
        where: { userId: user.id },
    });

    if (!customer) return null;

    await prismaClient.offer.update({
        where: { id: offerId },
        data: {
            status: 'reserved',
            customerId: customer.id,
        }
    });
}

export const pickupOffer = async (offerId: number) => {
    await prismaClient.offer.update({
        where: { id: offerId },
        data: {
            status: 'taken',
        }
    });
}

export const getUserOffersHistory = async (firebaseAuthId: string | undefined) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    const customer = await prismaClient.customer.findFirst({
        where: { userId: user.id },
    });

    if (!customer) return null;

    return await prismaClient.offer.findMany({
        where: { customerId: customer.id },
        select: {
            id: true,
            createdAt: true,
            title: true,
            description: true,
            photoUrl: true,
            pickupTime: true,
            status: true,
            products: {
                select: {
                    title: true
                },
            },
            businessOwner: {
                select: {
                    title: true,
                    id: true,
                }
            },
            category: {
                select: {
                    title: true,
                }
            }
        }
    })
}

export const createReview = async (firebaseAuthId: string | undefined, receiverId: number, offerId: number, reviewData: any) => {
    const user = await getUser(firebaseAuthId);
    if (!user) return null;

    let receiver;
    if (user.role === 'business') {
        receiver = await prismaClient.customer.findFirst({
            where: { id: receiverId },
            include: { user: true }
        });
    } else {
        receiver = await prismaClient.businessOwner.findFirst({
            where: { id: receiverId },
            include: { user: true },
        });
    }

    if (!receiver) return null;

    await prismaClient.review.create({
        data: {
            rating: reviewData.rating,
            comment: reviewData.comment,
            offer: {
                connect: { id: offerId },
            },
            giver: {
                connect: {
                    firebaseUserId: firebaseAuthId,
                }
            },
            receiver: {
                connect: {
                    firebaseUserId: receiver.user.firebaseUserId,
                }
            }
        }
    })
}