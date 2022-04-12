import prismaClient from "../configs/prisma.config";

export const getStock = async (firebaseAuthId: string | undefined) => {
    if (!firebaseAuthId) return null;

    const user = await prismaClient.user.findFirst({ where: { firebaseUserId: firebaseAuthId }})

    if (!user) return null;

    const userWithProducts = await prismaClient.businessOwner.findFirst({
        where: { userId: user.id },
        include: {
            products: true,
        }
    })

    return userWithProducts?.products || [];
};

export const createOffer = async (offerData: any, firebaseAuthId: string | undefined) => {
    if (!firebaseAuthId) return null;

    const user = await prismaClient.user.findFirst({ where: { firebaseUserId: firebaseAuthId }})

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