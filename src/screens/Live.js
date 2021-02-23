/* eslint-disable react-native/no-inline-styles */
import {api} from 'boxcast-sdk-js';
import React, {Component} from 'react';
import {View} from 'react-native';
import VideoPlayer from 'react-native-video';
import moment from 'moment';
import Overlay from '../components/Overlay/Overlay';
import styles from '../Styles';

const PREROLL_VIDEO =
  'https://uploads.boxcast.com/s0dfavw2jtjhbv43fkx4/2021-01/l5ghg3sovcdnjlmwty1i/Preroll__Jan2021_.mp4';
const channel_id = 'edy1sypmjj05xpt3usbe';

class Live extends Component {
  /*
    We have a 200 api call/hr per device limit!
  **/

  state = {
    currentBroadcast: PREROLL_VIDEO,
    nextBroadcast: {
      messageName: '',
      messageTime: '',
    },
  };

  componentDidMount() {
    this.interval = setInterval(() => this.getCurrentBroadcast(), 5000);
    this.interval = setInterval(() => this.getNextBroadcast(), 600000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNextBroadcast = () => {
    api.broadcasts
      .list(channel_id, {
        q: 'timeframe:next',
        s: '-starts_at',
      })
      .then((r) => {
        if (r.data.length > 0) {
          return this.setState({
            nextBroadcast: {
              messageName: r.data[0].name,
              messageTime: moment(r.data[0].starts_at).calendar(),
            },
          });
        } else {
          return this.setState({
            nextBroadcast: {
              messageName: '',
              messageTime: '',
            },
          });
        }
      });
  };

  getCurrentBroadcast() {
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
              return this.setState({
                currentBroadcast: view.playlist,
              });
            });
        } else {
          return this.setState({
            currentBroadcast: PREROLL_VIDEO,
          });
        }
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.getNextBroadcast()}
        <VideoPlayer
          source={{uri: this.state.currentBroadcast}}
          ref={(ref) => {
            this.player = ref;
          }}
          style={styles.backgroundVideo}
        />
        {this.state.currentBroadcast === PREROLL_VIDEO &&
        this.state.nextBroadcast.messageName !== '' ? (
          <Overlay
            message={{
              line1: this.state.nextBroadcast.messageName,
              line2: `Next broadcast starts: ${this.state.nextBroadcast.messageTime}`,
            }}
          />
        ) : null}
      </View>
    );
  }
}

export default Live;
