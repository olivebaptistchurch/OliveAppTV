import {StyleSheet} from 'react-native';

export const overlayStyles = StyleSheet.create({
  overlay: {
    height: 500,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingLeft: 100,
  },
  messageHeader: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
  },
  messageText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '300',
    paddingTop: 10,
  },
});
