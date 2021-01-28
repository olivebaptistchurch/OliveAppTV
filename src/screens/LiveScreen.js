import {api} from 'boxcast-sdk-js';
import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import VideoPlayer from 'react-native-video';
import moment from 'moment';
import Overlay from '../components/Overlay/Overlay';
import {useInterval} from '../Utility/helpers';
import styles from '../Styles';

const PREROLL_VIDEO =
  'https://uploads.boxcast.com/s0dfavw2jtjhbv43fkx4/2021-01/l5ghg3sovcdnjlmwty1i/Preroll__Jan2021_.mp4';
const channel_id = 'v5rbqd6pznpte4uowpoh';

const LiveScreen = ({navigation}) => {
  /*
    We have a 200 api call per device limit!
  **/

  const [currentBroadcast, setCurrentBroadcast] = useState(PREROLL_VIDEO);
  const [nextBroadcast, setNextBroadcast] = useState({
    messageName: '',
    messageTime: '',
  });

  function getNextBroadcast() {
    api.broadcasts
      .list(channel_id, {
        q: 'timeframe:next',
        s: '-starts_at',
      })
      .then((r) => {
        if (r.data.length > 0) {
          setNextBroadcast({
            messageName: r.data[0].name,
            messageTime: moment(r.data[0].starts_at).calendar(),
          });
        } else {
          setNextBroadcast({
            messageName: '',
            messageTime: '',
          });
        }
      });
  }

  function getCurrentBroadcast() {
    api.broadcasts
      .list(channel_id, {
        q: 'timeframe:current',
        s: '-starts_at',
        l: 20,
        p: 0,
      })
      .then((r) => {
        var isLive = r.data.length;

        if (isLive) {
          var broadcast_id = null;
          if (r.data[0].id) {
            broadcast_id = r.data[0].id;
          }
          api.views
            .get(broadcast_id, {
              channel_id: channel_id,
              extended: true,
            })
            .then((view) => {
              // console.log(isLive)
              setCurrentBroadcast(view.playlist);
            });
        } else {
          setCurrentBroadcast(PREROLL_VIDEO);
        }
      });
  }

  getNextBroadcast();

  useInterval(() => {
    getNextBroadcast(), 120000;
  });

  useInterval(() => {
    getCurrentBroadcast(), 5000;
  }); // Make call every 5s

  return (
    <View style={{flex: 1}}>
      <VideoPlayer
        source={{uri: currentBroadcast}}
        ref={(ref) => {
          this.player = ref;
        }}
        style={styles.backgroundVideo}
      />
      {currentBroadcast === PREROLL_VIDEO &&
      nextBroadcast.messageName !== '' ? (
        <Overlay
          message={{
            line1: nextBroadcast.messageName,
            line2: `Next broadcast starts: ${nextBroadcast.messageTime}`,
          }}
        />
      ) : null}
    </View>
  );
};

export default LiveScreen;
