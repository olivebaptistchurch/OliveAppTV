import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Live from '../screens/Live';

const Stack = createStackNavigator();

const StackedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Live} />
    </Stack.Navigator>
  );
};

export default StackedNavigator;
