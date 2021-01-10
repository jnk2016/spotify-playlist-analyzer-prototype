import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserProfileScreen from '../screens/UserProfileScreen';
import Settings from '../screens/CurrentSettings';
import LogOffScreen from '../screens/LogoffScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function SideBarNavigation(){
  return (
 <Drawer.Navigator
    drawerContentOptions={{
    activeTintColor: '#FF0000',
    itemStyle: { marginVertical: 5 },
   }}>
   <Drawer.Screen
     name="Dashboard"
     options={{ drawerLabel: 'My Profile'}}
     component={firstScreenStack} />
   <Drawer.Screen
     name="Account"
     options={{ drawerLabel: 'My Account' }}
     component={secondScreenStack} />
   <Drawer.Screen
     name="Log Off"
     options={{ drawerLabel: 'Log Off' }}
     component={thirdScreenStack} />
 </Drawer.Navigator>
);
}


function NavigationDrawerStructure(props){
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png'}}
          style={{
            width: 30,
            height: 30,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}


function firstScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="FirstPage">
        <Stack.Screen
          name="FirstPage"
          component={UserProfileScreen}
          options={{
            title: 'Dashboard', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerTitle: () => 
              <LogoTitle
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

function secondScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="SecondPage">
        <Stack.Screen
          name="SecondPage"
          component={Settings}
          options={{
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerTitle: () => 
                <LogoTitle
                  navigationProps={navigation}
                />
              ,
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

function thirdScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="LogOffScreen">
        <Stack.Screen
          name="Log Off"
          component={LogOffScreen}
          options={{
            title: 'Log Off', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
            headerTitle: () => 
              <LogoTitle
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

function LogoTitle(props) {
  return (
    <View style = {styles.imagecontainer}>
      <View style = {styles.sameline}>
        <Image
          source={require('../assets/images/PayPerDrive_Horizontal.png')}
          style={{flex: 1, width: 90, height: 50, resizeMode: "contain", justifyContent: "center"}}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  payperdrive: {
    color: '#C60A0A',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sameline: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    right: 20
  },
})
