import prismaClient from "../configs/prisma.config";

const createFoodCollection = async (foodCollection: any) => {
    await prismaClient.foodCollection.create({
        data: {
            title: foodCollection.title,
            latitude: foodCollection.coordinates.latitude,
            longitude: foodCollection.coordinates.longitude,
            description: foodCollection.description,
            neededIngredients: {
                connect: foodCollection.neededIngredients.map((ingredientId: number) => ({ id: ingredientId })),
            },
            isActive: true,
        }
    });

    // await delay(5000);
    //
    // const tokens = await prismaClient.deviceToken.findMany();
    // await sendPushNotification(tokens.map(t => t.token));
}

const getAllFoodCollections = async () => {
    return await prismaClient.foodCollection.findMany({
        include: {
            neededIngredients: true,
        }
    });
}

const getFoodCollection = async (id: string) => {
    return await prismaClient.foodCollection.findFirst({
        where: { id: Number(id) },
        include: {
            neededIngredients: true,
        }
    });
}

module.exports = {
    createFoodCollection,
    getAllFoodCollections,
    getFoodCollection,
}

export {};