import React, {Component, useState} from 'react';
import {Button, Image, StyleSheet, TextInput, TouchableHighlight, Text, View, Alert, ScrollView, ImageBackground} from 'react-native';
import Modal from 'modal-react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Home extends Component {

  render() {return (
    <ImageBackground source = {{uri:require('../assets/images/planet_earth_7am.jpg')}} style = {styles.backgroundimage} blurRadius= {200}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.playlistContainer}>
            {/* <View style={{width:'100%'}}> */}
              <Image source={require('../assets/images/planet_earth_7am.jpg')} style={styles.playlistArtwork}/>
            {/* </View> */}
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName}>7AM PLANET EARTH</Text>
              <Text style={styles.playlistUser}>by Jackson Kim</Text>
              <Text style={styles.playlistDesc}>Pointless all nighter, monster, blue planet, tandat and blai, good vibes</Text>
              <Text style={styles.trackAmount}>100 Tracks</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.spotifyButton}>
            <Text style={styles.buttonText}>PLAY ON SPOTIFY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          {/* <View>
            <Text style={styles.optionsLabel}>sort by</Text>
            <TouchableOpacity style={styles.dropdownText}>date added</TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.filterText}></Text>
            <TouchableOpacity style={styles.filterButton}>    key    </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>  energy  </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>camelot</TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>    bpm    </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );}

}

const styles = StyleSheet.create({
  optionsContainer:{
    flexDirection: 'row',
  },
  sortContainer:{

  },
  filterContainer:{

  },
  optionsLabel:{

  },
  dropdownText:{

  },
  filterButton:{

  },
  filterText:{

  },
  backgroundimage: {
    // flex: 1,
    resizeMode: 'cover',
    // justifyContent: "center",
    // alignItems: 'center',
    // alignText: 'center',
    // alignContent: 'center',
    height: '100%'
  },
  headerContainer:{
    flexDirection: 'row',
    width: '90%',
    // alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  spotifyButton:{
    backgroundColor: '#5BCC96',
    justifyContent: 'center',
    paddingVertical: '8%',
    paddingHorizontal: '5%',
    borderRadius: 100,
    marginTop: '35%',
    // alignSelf:'center',
    // alignContent: 'center',
    width: 160,
  },
  buttonText:{
    color:'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Spartan',
    textAlign: 'center',
    alignSelf: 'center'
  },
  playlistContainer:{
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  playlistArtwork:{
    // width: '30%',
    // height:'100%', 
    padding: '25%',
    resizeMode: 'contain',
    // marginLeft: '4%',
    // resizeMethod:'auto'
  },
  playlistInfo:{
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingVertical: '10%',
    marginLeft: '4%',
    width: '100%'
  },
  playlistName:{
    color: 'white',
    fontSize: 24,
    fontFamily: 'Spartan',
    fontWeight: '600'
  },
  playlistUser:{
    color: '#C4C4C4',
    fontSize: 12,
    fontFamily: 'Spartan',
    fontWeight: '600'
  },
  playlistDesc:{
    color: 'white',
    fontSize: 14,
    fontFamily: 'Spartan',
    width: '90%',
  },
  trackAmount:{
    color: 'white',
    fontSize: 13,
    fontFamily: 'Spartan',
  },

})

  export default Home;