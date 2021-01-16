import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import SideBar from './SideBar';
import Home from './screens/Playlist';
import MyTabs from './BottomTabNavigation/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Playlist from './screens/Playlist';
import Settings from './screens/Settings'

export default function App({navigation}) {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View>
       <MyTabs/>

        {/* <StatusBar /> */}

        {/* <Home/> */}

        {/* <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Playlist" component={Playlist} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer> */}

      </View>
    //   <div className="App">
    //     <html lang="en">
    // <head>
    //     <meta charSet="UTF-8"/>
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    //     <title>HOME</title>
    //     <link rel="stylesheet" href="home.css"/>
    //     <style>@import url('https://fonts.googleapis.com/css2?family=Spartan&display=swap');</style>
    // </head>
    // <body>
    //     {/* <div className="navbar">
    //         <div className="bottom_options">
    //             <ul>
    //                 <li><a href="#"><img src="./assets/images/home.png" alt="home" id="home"/></a></li>
    //                 <li><a href="#"><img src="./assets/images/CALENDAR.png" alt="calen" id="calendar"/></a></li>
    //                 <li><a href="#"><img src="./assets/images/EVENT.png" alt="event" id="event"/></a></li>
    //                 <li><a href="#"><img src="./assets/images/ACTIVITY.png" alt="activity" id="activity"/></a></li>
    //                 <li><a href="#"><img src="./assets/images/SETTINGS.png" alt="settings" id="settings"/></a></li>
    //             </ul>
    //         </div>
    //     </div> */}
    //     <div className="calendar">
    //         <p><b>JANUARY 2021</b></p>
    //         <div className="options">
    //             <ul>
    //                 <li><a href="#">SUN<br/>3</a></li>
    //                 <li><a href="#">MON<br/>4</a></li>
    //                 <li><a href="#">TUE<br/>5</a></li>
    //                 <li><a href="#">WED<br/>6</a></li>
    //                 <li><a href="#">THU<br/>7</a></li>
    //                 <li><a href="#" id="main">FRI<br/>8</a></li>
    //                 <li><a href="#">SAT<br/>9</a></li>
    //             </ul>
    //         </div>
    //     </div>
    //     <div className="header">
    //         <h1>TODAY</h1>
    //         <h2>My tasks</h2>
    //         <h3>TO DO
    //             <a href="#">you have 5 tasks to start</a>
    //         </h3>
    //         <h4>IN PROGRESS
    //             <a href="#">you have 1 task to complete</a>
    //         </h4>
    //         <h5>My Schedule
    //             <div className="events">
    //                 <ul>
    //                     <li>
    //                         <div className="study">10 AM
    //                             <a href="#">STUDY</a>
    //                         </div>
    //                     </li>
    //                     <li>
    //                         <div className="work">1-9 PM 
    //                             <a href="#">WORK</a>
    //                         </div>
    //                     </li>
    //                     <li>
    //                         <div className="dinner">9:30 PM
    //                             <a href="#">DINNER</a>
    //                         </div>
    //                     </li>    
    //                 </ul>
    //             </div>
    //         </h5>
    //     </div>
    // </body>
    // </html>
    //   </div>
    );
  }
 
}
