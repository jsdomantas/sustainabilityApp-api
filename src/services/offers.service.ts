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