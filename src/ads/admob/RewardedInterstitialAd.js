import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
    RewardedInterstitialAd,
    RewardedAdEventType,
    TestIds,
} from 'react-native-google-mobile-ads';
import { keywords, ADMOB_IDS } from '../keys';
const adUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : ADMOB_IDS.REWARDED_INTERSTITIAL;

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords,
});

export default () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => {
                setLoaded(true);
            },
        );
        const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded interstitial ad straight away
        rewardedInterstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);
    React.useEffect(() => {
        if (loaded) {
            rewardedInterstitial.show()
        }
    }, [loaded])
    return <View />
}