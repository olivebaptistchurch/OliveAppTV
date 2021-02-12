import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import theme from '../Utility/theme';

import Live from '../screens/Live';
import Home from '../screens/Home';
import Kids from '../screens/Kids';

const Tab = createMaterialTopTabNavigator();

const TabbedNavigator = () => {
  return (
    <Tab.Navigator
      lazy={true}
      tabBarOptions={theme.tabBar.options}
      style={theme.tabBar.style}
      initialRouteName="Home">
      <Tab.Screen name="Live" component={Live} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Kids" component={Kids} />
    </Tab.Navigator>
  );
};

export default TabbedNavigator;
