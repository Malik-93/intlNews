import React from 'react';
import { View } from 'react-native';
import {
    AdMobRewarded,
    AdTestIds
} from 'react-native-admob-next';
import { ADMOB_AD_UNIT_IDS } from '../../config/config';

const adUnitId = __DEV__ ? AdTestIds.INTERSTITIAL : ADMOB_AD_UNIT_IDS.REWARDED;
AdMobRewarded.setAdUnitID(adUnitId);
AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
export default () => {
    return <View />
}

