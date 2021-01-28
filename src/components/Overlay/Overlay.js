import React from 'react';

import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {overlayStyles} from './Overlay.styles';

const Overlay = (props) => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,.7)', 'transparent']}
      start={{x: 0.5, y: 0.35}}
      style={overlayStyles.overlay}>
      <Text style={overlayStyles.messageHeader}>{props.message.line1}</Text>
      <Text style={overlayStyles.messageText}>{props.message.line2}</Text>
    </LinearGradient>
  );
};

export default Overlay;
