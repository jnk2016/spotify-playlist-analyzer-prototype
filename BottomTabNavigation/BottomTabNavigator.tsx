import * as React from 'react';
import { Text,TouchableOpacity, View, Image } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Playlist from '../screens/Playlist';
import Settings from '../screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
// import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';

/* May have to create own top tab navigation that does what I want it to do
  and is a class that is applied as a header to each screen in a stack */

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

// function MyTabBar({ state, descriptors, navigation, position }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         const inputRange = state.routes.map((_, i) => i);
//         const opacity = Animated.interpolate(position, {
//           inputRange,
//           outputRange: inputRange.map(i => (i === index ? 1 : 0)),
//         });

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Animated.Text style={{ opacity }}>
//               {label}
//             </Animated.Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

export default function MyTabs() {
  return (
    <NavigationContainer>
        <Tab.Navigator 
          // tabBar={props => <MyTabBar {...props}/>}

          tabBarOptions={{
            indicatorStyle: {backgroundColor: 'white'},
            tabStyle: {backgroundColor: '#353535'},
            labelStyle:{color:'white', fontFamily: 'Spartan'}
          }}
          swipeEnabled={false}

          //  screenOptions={({ route }) => ({
          //      tabBarIcon: ({ focused, color, size }) => {
          //          if(route.name === 'Home'){
          //              return(<Image source={require('../assets/images/home.png')} style={{width:33, height:33, marginBottom: 1}}/>)
          //          }
          //          else if(route.name === 'Calendar'){
          //              return(<Image source={require('../assets/images/CALENDAR.png')}style={{width:25, height:25}}/>)
          //          }
          //          else if(route.name === 'FeatureList'){
          //              return(<Image source={require('../assets/images/ACTIVITY.png')}style={{width:25, height:40, marginBottom: 15}}/>)
          //          }
          //          else if(route.name === 'Settings'){
          //              return(<Image source={require('../assets/images/SETTINGS.png')}style={{width:28, height:28}}/>)
          //          }
          //      }
          //  })}

         >
            <Tab.Screen name="Playlist" component={PlaylistStackScreen} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = createStackNavigator();
function PlaylistStackScreen(){
    return(
        <HomeStack.Navigator screenOptions={{ headerShown: false}}>
            <HomeStack.Screen name = "Home" component={Playlist}
                              // options={{
                              //   title: "Hello, Danphuong",
                              //   headerStyle: {
                              //     borderBottomColor: 'transparent',
                              //     backgroundColor: '#FFFFFF', //Set Header color
                              //   },
                              //   headerTintColor: '#000000', //Set Header text color
                              //   headerTitleStyle: {
                              //     fontWeight: '600', //Set Header text style
                              //     fontFamily: 'Spartan',
                              //   },
                              //   headerRight: ()=> <ProfilePic/>,
                              // }}
                              />
        </HomeStack.Navigator>
    );
}

// function ProfilePic(){
//   return (
//     <View style={{ flexDirection: 'row' }}>
//         {/* Back Button Image */}
//         <Image
//           source={require('../assets/images/Ellipseavatar.png')}
//           style={{
//             width: 50,
//             height: 50,
//             marginRight: 10,
//           }}
//         />
//     </View>
//   );
// }

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