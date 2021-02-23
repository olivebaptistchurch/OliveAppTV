import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import StackedNavigator from './src/navigation/StackedNavigator';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = () => {
  return (
    <NavigationContainer>
      <StackedNavigator />
    </NavigationContainer>
  );
};

export default App;
