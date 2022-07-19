import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { keywords, ADMOB_IDS } from '../keys';

const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_IDS.BANNER;

export default () => {
    console.log('BannerAd ran...');
    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
                keywords
            }}
        />
    );
}