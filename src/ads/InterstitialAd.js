import React from 'react';
import { View } from 'react-native';
import {
    AdMobInterstitial,
    AdTestIds
} from 'react-native-admob-next';
import { ADMOB_AD_UNIT_IDS } from '../../config/config';

const adUnitId = __DEV__ ? AdTestIds.INTERSTITIAL : ADMOB_AD_UNIT_IDS.INTERSTITIAL;
AdMobInterstitial.setAdUnitID(adUnitId);
AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
export default () => {
    return <View />
}

