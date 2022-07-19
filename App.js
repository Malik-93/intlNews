/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import { ProgressBar } from '@react-native-community/progress-bar-android';
// import AppOpenAd from './src/ads/admob/AppOpenAd'; // Done
// import InterstitialAd from './src/ads/admob/InterstitialAd'; // Done
import BannerAd from './src/ads/admob/BannerAd'; // Done
import { closeFCM, codepush_sync, CODE_PUSH_OPTIONS, initFCM } from './src/utils';
// import GAMBannerAd from './src/ads/admob/GAMBannerAd';
// import RewardedAds from './src/ads/admob/RewardedAds'; // Done
// import RewardedInterstitialAd from './src/ads/admob/RewardedInterstitialAd'; // Done
import CodePush from "react-native-code-push";
const { height, width } = Dimensions.get('screen');
const ICON_SIZE = width * .1;
const baseUrl = "https://apps-permissions.herokuapp.com";
const extra = 8;
const Icon = ({ element: { channalIcon = '', id = 1, url = '' }, selected = 1, onChannelPress }) => {
  return <TouchableOpacity onPress={() => onChannelPress(url, id)} style={[{ height: ICON_SIZE + extra, width: ICON_SIZE + extra, borderRadius: (ICON_SIZE + extra) / 2, marginHorizontal: 5, justifyContent: "center", alignItems: "center" }, id == selected ? { borderWidth: 1.5, borderColor: '#5BE7CE' } : {}]}>
    <Image resizeMode='contain' source={{ uri: channalIcon }} style={{ height: ICON_SIZE, width: ICON_SIZE, borderRadius: ICON_SIZE / 2 }} />
  </TouchableOpacity >
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const web_view_ref = React.useRef();
  const [uri, setUri] = React.useState('https://www.bbc.com');
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onBack = () => {
    web_view_ref.current?.goBack();
    return true;
  }
  // console.log(web_view_ref.current);

  const getSetData = () => {
    fetch(baseUrl + '/api/permissions', {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('data...', data);
        setData(data.permissions.news_data)
      })
      .catch(() => { })
      .finally(() => { })
  }

  React.useEffect(() => {
    getSetData();
    codepush_sync();
    initFCM()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack)
    return () => {
      backHandler.remove();
      closeFCM();
    }
  }, [])

  const onChannelPress = (uri, id) => {
    setUri(uri);
    setSelected(id)
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor='transparent' />
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, margin: 5, backgroundColor: 'transparent' }}>
        {(data || []).map((el, idx) => (
          <Icon key={`icon-${idx}`} element={el} selected={selected} onChannelPress={onChannelPress} />
        ))}
      </ScrollView> */}
      <View style={styles.container}>
        {
          loading ?
            <ProgressBar
              styleAttr="Horizontal"
              indeterminate={true}
              progress={0.5}
            />
            :
            null
        }
        <WebView
          ref={web_view_ref}
          source={{ uri: 'www.google.com' }} onNavigationStateChange={({ loading, url, canGoBack, canGoForward, }) => {
            // console.log('canGoBack', canGoBack);
            setLoading(loading)
          }} />
      </View>
      <BannerAd />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CodePush(CODE_PUSH_OPTIONS)(App);