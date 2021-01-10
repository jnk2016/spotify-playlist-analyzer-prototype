import * as React from 'react';
import Experiment from '../screens/Experiment';
import CurrentLeasePlan from '../screens/CurrentLeasePlan';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#808080',
        inactiveTintColor: '#808080',
        style: {
          fontSize: '6',
          fontWeight: 'bold',
          backgroundColor: '#FFFFFF',
        },
        indicatorStyle: {
          borderBottomColor: '#C60A0A',
          borderBottomWidth: 4,
        },
      }}>
      <Tab.Screen
        name="FirstPage"
        component={CurrentLeasePlan}
        options={{
          tabBarLabel: 'Current Lease Plan',
        }}  />
      <Tab.Screen
        name="Experiment"
        component={Experiment}
        options={{
          tabBarLabel: 'Experiment',
        }} />
    </Tab.Navigator>
  );
}

function TopTabNavigator() {
  return (
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: '#C60A0A' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="TabStack"
          component={TabStack}
          options={{ title: 'Tab Stack' }}
        />
      </Stack.Navigator>
  );
}

export default TopTabNavigator
