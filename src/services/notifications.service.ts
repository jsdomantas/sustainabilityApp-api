import admin from "firebase-admin";

export const sendBackgroundPushNotifications = async (tokens: string[]) => {
    await admin.messaging().sendToDevice(tokens, {
        notification: {
            body: 'New offer',
            title: 'A new offer has just appeared, check it out',
        },
        data: {
            type: 'alarmNotification',
        },
    })
}

