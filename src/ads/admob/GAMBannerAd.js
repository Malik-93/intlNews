import React from 'react';
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { keywords } from '../keys';

const adUnitId = __DEV__ ? TestIds.GAM_BANNER : '';

export default () => {
    return (
        <GAMBannerAd
            unitId={adUnitId}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords
            }}
        />
    );
}