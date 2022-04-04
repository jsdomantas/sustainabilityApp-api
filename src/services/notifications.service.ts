import admin from "firebase-admin";

const sendBackgroundPushNotifications = async (tokens: string[]) => {
    await admin.messaging().sendToDevice(tokens, {
        notification: {
            body: 'Test body',
            title: 'Test title',
        },
        data: {
            type: 'alarmNotification',
        },
    })
}

module.exports = {
    sendBackgroundPushNotifications,
}