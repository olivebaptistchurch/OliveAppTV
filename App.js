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
import Overlay from './src/components/Overlay/Overlay';
import moment from 'moment';
import { useInterval } from './src/Utility/helpers';
var { api } = require('boxcast-sdk-js');

const PREROLL_VIDEO = "https://uploads.boxcast.com/s0dfavw2jtjhbv43fkx4/2021-01/l5ghg3sovcdnjlmwty1i/Preroll__Jan2021_.mp4";
const channel_id = "v5rbqd6pznpte4uowpoh"

const StatusBar = Platform.isTV ? View : ReactNative.StatusBar;



const App: () => React$Node = () => {
  /*
    We have a 200 api call per device limit!
  **/
  
  const [currentBroadcast, setCurrentBroadcast] = useState(PREROLL_VIDEO);
  const [nextBroadcast, setNextBroadcast] = useState({ 
    messageName: "",
    messageTime: ""
   })

  function getNextBroadcast() { 
    api.broadcasts.list(channel_id, {
      q: 'timeframe:next',
      s:'-starts_at',
    }).then((r) => {
      if(r.data.length > 0) {
        setNextBroadcast({
          messageName: r.data[0].name,
          messageTime: moment(r.data[0].starts_at).calendar()
        })
      } else {
        setNextBroadcast({
          messageName: "",
          messageTime: ""
        })
      }
    })
  };

  function getCurrentBroadcast() {
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
          // console.log(isLive)
          setCurrentBroadcast(view.playlist)
        })
      } else {
        setCurrentBroadcast(PREROLL_VIDEO)
      }
      });
  }

  getNextBroadcast()

  useInterval(() => { getNextBroadcast(), 120000 });
  
  useInterval(() => { getCurrentBroadcast(), 5000 }); // Make call every 5s

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <VideoPlayer  source={{ uri: currentBroadcast }}
                ref={(ref) => {
                  this.player = ref
                }}
                style={styles.backgroundVideo} />
        { currentBroadcast === PREROLL_VIDEO &&
          nextBroadcast.messageName !== "" ?
            <Overlay message={{
              line1: nextBroadcast.messageName,
              line2: `Next broadcast starts: ${nextBroadcast.messageTime}`}} /> 
          : null }
        
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
