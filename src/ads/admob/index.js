import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

export default () => mobileAds()
    .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['98096fb0'],
    })
    .then(() => {
        console.log('Request config successfully set!');
        mobileAds().initialize().then(adapterStatuses => {
            console.log('mobileAds initialized successfully!', adapterStatuses);
        })
    });