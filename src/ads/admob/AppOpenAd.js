import React from 'react';
import { View } from 'react-native';
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { keywords, ADMOB_IDS } from '../keys';
const adUnitId = __DEV__ ? TestIds.APP_OPEN : ADMOB_IDS.OPEN_APP;

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords,
});

export default () => {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {

        const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });


        // Start loading the rewarded ad straight away
        appOpenAd.load();
        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
        };
    }, []);
    React.useEffect(() => {
        if (loaded) {
            appOpenAd.show()
        }
    }, [loaded])
    return <View />
} 