import { Platform } from "react-native";
import CodePush from "react-native-code-push";
import { CODE_PUSH } from "../../configs";
import { fcmService } from "../services/FCMServices";
import { localNotificationService } from "../services/LocalNotificationServices";
export const toast = {
    info: (msg) => { }
}
export const message = (msg) => {
    toast.info(msg)
}
export const codePushStatusDidChange = (syncStatus) => {
    switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            // message("Checking for update.");
            break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            message("Downloading package.");
            break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
            // message("Awaiting user action.");
            break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
            message("Installing update...");
            break;
        case CodePush.SyncStatus.UP_TO_DATE:
            // message("App up to date.");
            break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
            message("Update cancelled by user.");
            break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
            message("Update installed and app will be restart shortly");
            break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
            message("An unknown error occurred.");
            break;
    }
}
export const codePushDownloadDidProgress = (progress) => {
    console.log("progress", progress);
}

export const CODE_PUSH_OPTIONS = {
    deploymentKey: Platform.select({
        ios: __DEV__ ? CODE_PUSH.IOS.STAGING : CODE_PUSH.IOS.PRODUCTION,
        android: __DEV__ ? CODE_PUSH.ANDROID.STAGING : CODE_PUSH.ANDROID.PRODUCTION,
    }),
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.ON_NEXT_RESUME,
    mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESUME,
    updateDialog: false
};

export const codepush_sync = () => CodePush.sync(CODE_PUSH_OPTIONS, syncStatus => {
    console.log("[CodePush.sync].syncStatus", syncStatus)
    codePushStatusDidChange(syncStatus)
}, progress => {
    console.log("[CodePush.sync].progress", progress)
    codePushDownloadDidProgress(progress)
})
export const pushNotification = (notify = {}) => {
    localNotificationService.showNotification(notify, {
        channelId: notify.channelId,
        soundName: Platform.select({ android: notify.data.soundName || "default", ios: "default" }),
        playSound: true,
        userInteraction: true,
    },
        // actions array
        [],
    )
}

export function onRegister(fcmToken) {
    console.log('[DrawerNavigator.js] onRegister fcmToken :', fcmToken);
    // postRequest(`/api/firebase/registerFcm`,
    //     {
    //         fcmToken,
    //     },
    //     (res, req) => console.log("[registerFcm]", res),
    //     (err, req) => {
    //         console.log("[registerFcm]", err);
    //         sharedServerToast(`/api/firebase/registerFcm`,
    //             req,
    //             err
    //         );
    //     }

    // )
};
export function onNotification(notify) {
    console.log("[[DrawerNavigator.js]] onNotification.notify -> ", notify)
    pushNotification(notify)
};
export function onOpenNotification(notify) {
    console.log("[[DrawerNavigator.js]] onOpenNotification.notify ->", notify);

};
export function onAction(notification) {
    console.log("[DrawerNavigator.js] ACTION:", notification.action);
    console.log("[DrawerNavigator.js] NOTIFICATION:", notification);
};
export function onRegistrationError(err) {
    console.error("[DrawerNavigator.js] onRegistrationError :", err.message, err);
};

export const initFCM = () => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onRegister, onRegistrationError, onOpenNotification, onAction);
}
export const closeFCM = () => {
    localNotificationService.unRegister();
    fcmService.unRegister();
}