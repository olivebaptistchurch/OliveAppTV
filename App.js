import 'react-native-gesture-handler';

import React from 'react';
import ReactNative, {Platform, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import StackedNavigator from './src/navigation/StackedNavigator';
import {enableScreens} from 'react-native-screens';

const StatusBar = Platform.isTV ? View : ReactNative.StatusBar;

enableScreens();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <StackedNavigator />
    </NavigationContainer>
  );
};

export default App;
