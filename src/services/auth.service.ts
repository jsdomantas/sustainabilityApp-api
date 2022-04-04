const prismaClient = require("../configs/prisma.config");

const createUser = async (firebaseUserId: string, email: string) => {
    await prismaClient.user.create({
        data: {
            firebaseUserId: firebaseUserId,
            email: email,
        }
    })
}

module.exports = {
    createUser,
}

export {};