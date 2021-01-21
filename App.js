/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import ReactNative, {
  StyleSheet,
  Platform,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import VideoPlayer from 'react-native-video';
var { api } = require('boxcast-sdk-js');

const PREROLL_VIDEO = "https://uploads.boxcast.com/s0dfavw2jtjhbv43fkx4/2021-01/l5ghg3sovcdnjlmwty1i/Preroll__Jan2021_.mp4";
const channel_id = "v5rbqd6pznpte4uowpoh"

const StatusBar = Platform.isTV ? View : ReactNative.StatusBar;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function getBroadcast() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(getBroadcast, delay);
      return () => clearInterval(id)
    }
  }, [delay])
}

const App: () => React$Node = () => {
  const [currentBroadcast, setCurrentBroadcast] = useState(PREROLL_VIDEO);
  
  useInterval(() => {
    api.broadcasts.list(channel_id, {
      q: 'timeframe:current',
      s: '-starts_at',
      l: 20,
      p: 0
    }).then((r) => {
      var isLive = r.data.length

      if(isLive) {
        var broadcast_id = null;
      if(r.data[0].id) { broadcast_id = r.data[0].id };
        api.views.get(broadcast_id, {
          channel_id: channel_id,
          extended: true
        }).then((view) => {
          console.log(isLive)
          setCurrentBroadcast(view.playlist)
        })
      } else {
        setCurrentBroadcast(PREROLL_VIDEO)
      }
      });
  }, 5000); // Make call every 5s

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <VideoPlayer  source={{ uri: currentBroadcast }}
                ref={(ref) => {
                  this.player = ref
                }}
                style={styles.backgroundVideo} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
