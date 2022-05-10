import admin from "firebase-admin";

export const sendBackgroundPushNotifications = async (tokens: string[], offerId: number) => {
    await admin.messaging().sendToDevice(tokens, {
        notification: {
            body: 'A new offer has been posted!',
            title: 'New offer',
        },
        data: {
            type: 'alarmNotification',
            navigateTo: 'ProductDetails',
            offerId: offerId.toString(),
        },
    })
}

