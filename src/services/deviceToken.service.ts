const prismaClient = require("../configs/prisma.config");

const saveDeviceToken = async (deviceToken: string, firebaseUserId: string) => {
    await prismaClient.deviceToken.create({
        data: {
            token: deviceToken,
            user: {
                connect: {
                    firebaseUserId,
                }
            }
        }
    })
};

module.exports = {
    saveDeviceToken,
}