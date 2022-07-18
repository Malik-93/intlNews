import React from 'react';
import {
    AdMobBanner,
    AdTestIds
} from 'react-native-admob-next'
import { ADMOB_AD_UNIT_IDS } from '../../config/config';
const adUnitId = __DEV__ ? AdTestIds.BANNER : ADMOB_AD_UNIT_IDS.BANNER;

export default props => {
    return (
        <AdMobBanner
            adSize="fullBanner"
            adUnitID={adUnitId}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
        />
    );
}