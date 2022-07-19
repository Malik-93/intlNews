import React from 'react';
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { keywords } from '../keys';

const adUnitId = __DEV__ ? TestIds.GAM_BANNER : '';

export default () => {
    const [hide, setHide] = React.useState(false);
    if (hide) return null;
    return (
        <GAMBannerAd
            onAdFailedToLoad={() => setHide(true)}
            unitId={adUnitId}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords
            }}
        />
    );
}