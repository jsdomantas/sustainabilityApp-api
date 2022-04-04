const prismaClient = require("../configs/prisma.config");

const getIngredients = async () => {
    return await prismaClient.ingredient.findMany();
}

module.exports = {
    getIngredients,
}

export {};