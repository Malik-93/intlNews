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
  Dimensions,
  Image,
  ProgressBarAndroid,
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
const { height, width } = Dimensions.get('screen');
const ICON_SIZE = width * .1;
const baseUrl = "https://apps-permissions.herokuapp.com";
const extra = 8;
const DATA = [
  {
    id: 1,
    channalName: 'BBC',
    channalIcon: 'https://is2-ssl.mzstatic.com/image/thumb/Purple112/v4/8b/a3/e9/8ba3e910-a240-549d-302c-7dacba2923d2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/256x256bb.jpg',
    url: 'https://www.bbc.com'
  },
  {
    id: 2,
    channalName: 'CNN',
    channalIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/1200px-CNN_International_logo.svg.png',
    url: 'https://edition.cnn.com/world'
  },
  {
    id: 3,
    channalName: 'NEW TIMES',
    channalIcon: 'https://w7.pngwing.com/pngs/470/246/png-transparent-new-york-city-the-new-york-times-company-news-the-new-york-times-international-edition-natural-gas-miscellaneous-text-trademark.png',
    url: 'https://www.newtimes.co.rw/'
  },
  {
    id: 4,
    channalName: 'GEO',
    channalIcon: 'https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/b0/6d/db/b06ddb42-516d-44bd-7238-64c75e3478d3/source/256x256bb.jpg',
    url: 'https://www.geo.tv/'
  },
]
const Icon = ({ element: { channalIcon = '', id = 1, url = '' }, selected = 1, onChannelPress }) => {
  return <TouchableOpacity onPress={() => onChannelPress(url, id)} style={[{ height: ICON_SIZE + extra, width: ICON_SIZE + extra, borderRadius: (ICON_SIZE + extra) / 2, marginHorizontal: 5, justifyContent: "center", alignItems: "center" }, id == selected ? { borderWidth: 1.5, borderColor: '#5BE7CE' } : {}]}>
    <Image resizeMode='contain' source={{ uri: channalIcon }} style={{ height: ICON_SIZE, width: ICON_SIZE, borderRadius: ICON_SIZE / 2 }} />
  </TouchableOpacity >
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [uri, setUri] = React.useState('https://www.bbc.com');
  const [data, setData] = React.useState(DATA);
  const [selected, setSelected] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
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
      })
      .catch(() => { })
  }, [])

  const onChannelPress = (uri, id) => {
    setUri(uri);
    setSelected(id)
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, margin: 5, backgroundColor: 'transparent' }}>
        {(data || []).map((el, idx) => (
          <Icon key={`icon-${idx}`} element={el} selected={selected} onChannelPress={onChannelPress} />
        ))}
      </ScrollView>
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
        <WebView source={{ uri }} onNavigationStateChange={({ loading }) => {
          // console.log('loading, url', loading, url);
          setLoading(loading)
        }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
