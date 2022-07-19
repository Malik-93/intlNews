import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
const appIcon = ''
class LocalNotificationService {
    configure = (onRegister, onRegistrationError, onOpenNotification, onAction) => {
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (deviceAndToken) {
                console.log("[LocalNotificationService] onRegister deviceAndToken:", deviceAndToken);
                // onRegister(deviceAndToken.token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("[LocalNotificationService] NOTIFICATION:", notification);
                if (!notification.data) return;
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === 'ios' ? notification.data.item : notification.data);
                // (required) Called when a remote is received or opened, or local notification is opened
                if (Platform.OS === 'ios') notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                // make sure reciver tag added in AndroidManifest.xml

                // console.log("[LocalNotificationService] ACTION:", notification.action);
                // console.log("[LocalNotificationService] NOTIFICATION:", notification);
                // PushNotification.invokeApp(notification)
                onAction(notification)
                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error("[LocalNotificationService] onRegistrationError :", err.message, err);
                onRegistrationError(err)
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    unRegister = () => PushNotification.unregister();

    showNotification = (notify, options = {}, actions = []) => {
        const { messageId, data, } = notify;
        const { title, body } = notify.notification;
        console.log('[data] :', data);
        console.log('[options] :', options);
        if (Platform.OS === "android") {
            PushNotification.createChannel(
                {
                    channelId: data.channel_id, // (required)
                    channelName: data.channel_id, // (required)
                    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                    soundName: options.soundName || "default", // (optional) See `soundName` parameter of `localNotification` function
                    importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
                    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
                    playSound: true
                },
                (created) => {
                    console.log(`createChannel returned '${created}'`); // (optional) callback returns whether the channel was created, false means it already existed.
                    PushNotification.localNotification({
                        ...this.buildAndroidNotification(notify, options = {}, options),
                        title: title || "",
                        message: body || "",
                        playSound: options.playSound || true,
                        userInteraction: options.userInteraction || true,
                        invokeApp: options.invokeApp || true,
                        actions,
                        ignoreInForeground: false,
                        allowWhileIdle: true
                    })
                });
        } else {
            PushNotification.localNotification({
                ...this.buildIOSNotification(messageId, title, body, data, options, notify),
                title: title || "",
                message: body || "",
                playSound: options.playSound || true,
                userInteraction: options.userInteraction || true,
                invokeApp: options.invokeApp || true,
                actions,
                ignoreInForeground: false
            })
        }
    };
    buildAndroidNotification = (notify = {}, options = {}) => {
        const { messageId, data } = notify;
        const { title, body } = notify.notification;
        const { smallIcon, largeIcon } = data;
        console.log("buildAndroidNotification called");
        let initNotifyObj = {
            ...notify,
            ...notify.notification,
            id: messageId,
            channelId: data.channel_id, // (required)
            channelName: data.channel_id, // (required)
            showWhen: true,
            autoCancel: true,
            bigText: body,
            subText: title,
            // visibility: "public",
            // importance: "high",
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            allowWhileIdle: options.allowWhileIdle || true,
            data,
            // Right side image
            largeIconUrl: appIcon,
            soundName: options.soundName || "default",
            smallIcon,
            largeIcon,
            // invokeApp: true,
            // imageUrl: "https://jovipublic.s3.me-south-1.amazonaws.com/600x600.png",
            // largeIconUrl: "https://www.uk2.net/blog/wp-content/uploads/domain-suffixes.jpg", for icon in message
            // bigPictureUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80", // (optional) default: undefined
            // bigLargeIcon: "ic_launcher", // (optional) default: undefined
            // bigLargeIconUrl: "https://www.uk2.net/blog/wp-content/uploads/domain-suffixes.jpg", // (optional) default: undefined
        }
        console.log("initNotifyObj", initNotifyObj);
        return initNotifyObj;
    };
    buildIOSNotification = (id, title, body, data = {}, options = {}) => {
        console.log("buildIOSNotification called");
        return {
            alertAction: options.alertAction || "view",
            category: options.category || "",
            userInfo: {
                id,
                item: data
            },
        }
    };
    cancelAllLocalNotifications = () => {
        console.log("[cancelAllLocalNotifications] called--")
        if (Platform.OS === "ios") PushNotificationIOS.removeAllDeliveredNotifications();
        else PushNotification.cancelAllLocalNotifications();
    };

    removeDeliveredNotificationByID = notificationID => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationID);
        PushNotification.cancelLocalNotifications({ id: notificationID })
    }
};

export const localNotificationService = new LocalNotificationService();