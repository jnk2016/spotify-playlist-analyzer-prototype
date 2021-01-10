import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName,View, TouchableOpacity, Image } from 'react-native';

import { RootStackParamList } from '../types';
import SideBarNavigation from './SideBarNavigation';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Activity from '../screens/Activity';
import LeaseScreen from '../screens/LeaseScreen';
import ChangeSettings from '../screens/ChangeSettings';
import NewPassword from '../screens/NewPassword';
import MileageAccount from '../screens/MileageAccount';
import Home from '../screens/Playlist';
import FeatureList from '../screens/FeatureList';

const Drawer = createDrawerNavigator();
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function SideBar({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
           name = "FeatureList"
           component ={FeatureList}
      />
      <Drawer.Screen
           name = "Homee"
           component ={Home}
      />
      <Drawer.Screen
           name = "Login"
           component ={LoginScreen}
      />
      <Drawer.Screen
        name = "Home"
        component ={HomeScreen}
      />
      <Drawer.Screen
        name = "Mileage Account"
        component ={firstScreenStack}
      />
      <Drawer.Screen
        name = "Update Password"
        component ={secondScreenStack}
      />
      <Drawer.Screen
        name = "Update Information"
        component ={thirdScreenStack}
      />
      <Drawer.Screen
        name = "Leasing Activity"
        component ={fourthScreenStack}
      />
      <Drawer.Screen
        name = "Lease"
        component = {fifthScreenStack}
      />
      <Drawer.Screen name="UserProfileScreen" component={SideBarNavigation} />
    </Stack.Navigator>
  );
}


function BackButton(props){
  const back = () => {
    props.navigationProps.navigate("UserProfileScreen", {screen: 'UserProfileScreen'});
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> back()}>
        {/* Back Button Image */}
        <Image
          source={{uri: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/back-arrow-8-580723.png'}}
          style={{
            width: 35,
            height: 35,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

function fourthScreenStack({navigation}) {
  return (
      <Stack.Navigator initialRouteName="UserProfileScreen">
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{
            title: 'Activity', //Set Header Title
            headerLeft: ()=>
              <BackButton
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#FFFFFF', //Set Header color
            },
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function firstScreenStack({navigation}) {
  return (
      <Stack.Navigator initialRouteName="UserProfileScreen">
        <Stack.Screen
          name="Mileage Account"
          component={MileageAccount}
          options={{
            title: 'Mileage Account', //Set Header Title
            headerLeft: ()=>
              <BackButton
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#FFFFFF', //Set Header color
            },
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function fifthScreenStack({navigation}) {
  return (
      <Stack.Navigator initialRouteName="UserProfileScreen">
        <Stack.Screen
          name="Lease"
          component={LeaseScreen}
          options={{
            title: 'Lease', //Set Header Title
            headerLeft: ()=>
              <BackButton
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#FFFFFF', //Set Header color
            },
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function thirdScreenStack({navigation}) {
  return (
      <Stack.Navigator initialRouteName="UserProfileScreen">
        <Stack.Screen
          name="Change Settings"
          component={ChangeSettings}
          options={{
            title: 'Change Settings', //Set Header Title
            headerLeft: ()=>
              <BackButton
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#FFFFFF', //Set Header color
            },
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function secondScreenStack({navigation}) {
  return (
      <Stack.Navigator initialRouteName="UserProfileScreen">
        <Stack.Screen
          name="Update Password"
          component={NewPassword}
          options={{
            title: 'Update Password', //Set Header Title
            headerLeft: ()=>
              <BackButton
                navigationProps={navigation}
              />,
            headerStyle: {
              backgroundColor: '#FFFFFF', //Set Header color
            },
            headerTintColor: '#000000', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}