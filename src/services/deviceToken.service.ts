import prismaClient from "../configs/prisma.config";

export const saveDeviceToken = async (deviceToken: string, firebaseUserId: string | undefined) => {
    await prismaClient.deviceToken.upsert({
        where: { token: deviceToken },
        update: {},
        create: {
            token: deviceToken,
            user: {
                connect: {
                    firebaseUserId,
                }
            }
        }
    })
};