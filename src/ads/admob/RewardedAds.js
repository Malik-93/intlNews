import React from 'react';
import { View } from 'react-native';
import { RewardedAd, TestIds, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { keywords, ADMOB_IDS } from '../keys';

const adUnitId = __DEV__ ? TestIds.REWARDED : ADMOB_IDS.REWARDED;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords,
});

export default () => {
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);
    React.useEffect(() => {
        if (loaded) {
            rewarded.show()
        }
    }, [loaded])
    return <View />
} 