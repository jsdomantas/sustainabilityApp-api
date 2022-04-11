import prismaClient from "../configs/prisma.config";

const saveDeviceToken = async (deviceToken: string, firebaseUserId: string) => {
    const existingDeviceToken = await prismaClient.deviceToken.findFirst({
        where: {
            token: deviceToken,
        }
    })

    if (!existingDeviceToken) {
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
    }
};

module.exports = {
    saveDeviceToken,
}