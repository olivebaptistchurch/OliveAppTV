import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 25,
    paddingLeft: 50,
  },
  messageHeader: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
  },
  messageText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '300',
    paddingTop: 10,
  },
});
