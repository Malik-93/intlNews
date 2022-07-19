/**
 * @format
 */

import { AppRegistry } from 'react-native';
import admob from './src/ads/admob';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

admob();
messaging().setBackgroundMessageHandler(async remoteMessage => {
    // For background job
    console.log('[Index.js] message handeled in the background :', remoteMessage);
})
AppRegistry.registerComponent(appName, () => App);
