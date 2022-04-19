import prismaClient from "../configs/prisma.config";
import { getUser } from "../utils";

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

export const getAllAvailableOffers = async (parameters: any) => {
    console.log(parameters);

    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
        console.log({ lat1, lon1, lat2, lon2 });
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    if (!parameters) return [];

    const offers = await prismaClient.offer.findMany({
        where: {
            status: 'posted',
        },
        select: {
            id: true,
            createdAt: true,
            title: true,
            photoUrl: true,
            pickupTime: true,
            businessOwner: {
                select: {
                    title: true,
                    latitude: true,
                    longitude: true,
                }
            },
            category: {
                select: {
                    title: true
                }
            }
        }
    });

    if (parameters.latitude && parameters.longitude) {
        return offers.filter(offer => {
            const distanceBetweenUserAndOffer = calculateDistance(Number(parameters.latitude), Number(parameters.longitude), offer.businessOwner.latitude, offer.businessOwner.longitude);

            if (distanceBetweenUserAndOffer <= 50) {
                return offer;
            }
        });
    }

    return offers.filter(offer => {
        if (JSON.stringify(offer).includes(parameters.searchQuery)) {
            return offer;
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
                    user: {
                        select: {
                            reviewReceiver: true,
                        },
                    }
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