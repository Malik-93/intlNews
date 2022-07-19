import React from 'react';
import { View } from 'react-native';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { keywords, ADMOB_IDS } from '../keys';


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : ADMOB_IDS.INTERSTITIAL;
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords,
});

export default () => {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });
        // Start loading the interstitial straight away
        interstitial.load();
        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);
    React.useEffect(() => {
        if (loaded) {
            interstitial.show()
        }
    }, [loaded])
    return <View />
}

