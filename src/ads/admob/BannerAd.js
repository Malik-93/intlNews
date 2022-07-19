import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { keywords, ADMOB_IDS } from '../keys';
const adUnitId = __DEV__ ? ADMOB_IDS.BANNER : ADMOB_IDS.BANNER;
export default () => {
    const [hide, setHide] = React.useState(false);
    if (hide) return null;
    return (
        <BannerAd
            onAdFailedToLoad={() => setHide(true)}
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords,
            }}
        />
    );
}