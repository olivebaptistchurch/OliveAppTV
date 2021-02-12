import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import TabbedNavigator from './TabbedNavigator';

const Stack = createStackNavigator();

const StackedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={TabbedNavigator} />
    </Stack.Navigator>
  );
};

export default StackedNavigator;
