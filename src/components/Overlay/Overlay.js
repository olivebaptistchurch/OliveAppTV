import React from 'react';

import ReactNative, { 
  Text, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './Overlay.styles';

const Overlay = (props) => {
  return (
    <LinearGradient colors={['rgba(0,0,0,.7)', 'transparent']} start={{ x: .5, y: .35 }} style={styles.overlay}>
      <Text style={styles.messageHeader}>{ props.message.line1 }</Text>
      <Text style={styles.messageText}>{ props.message.line2 }</Text>
    </LinearGradient>
  );
};



export default Overlay;