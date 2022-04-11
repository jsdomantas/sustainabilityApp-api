import prismaClient from "../configs/prisma.config";


const getIngredients = async () => {
    return await prismaClient.ingredient.findMany();
}

module.exports = {
    getIngredients,
}

export {};