import React, {Component, useState} from 'react';
import {Button, Image, StyleSheet, TextInput, TouchableHighlight, Text, View, Alert, ScrollView, ImageBackground} from 'react-native';
import Modal from 'modal-react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {PieChart} from 'react-minimal-pie-chart';

class Song extends Component {

  render() {return (
    <ImageBackground source = {{uri:require('../assets/images/in_your_head.jpeg')}} style = {styles.backgroundimage} blurRadius= {200}>
      <ScrollView>
        <TouchableOpacity style={styles.spotifyButton}>
          <Text style={styles.buttonText}>PLAY ON SPOTIFY</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          {/* <View style={styles.circleImage}> */}
          <Image source={require('../assets/images/in_your_head.jpeg')} style={{ height: 500, width: 500, resizeMode: 'contain', alignSelf: 'center', borderRadius: 500, zIndex: 2,}} blurRadius={20}/>
          <View style={{zIndex:4, position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 400, width: 400}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 100, color: '#5BCC96' },
                  { title: 'Two', value: 15, color: '#6B68FF' },
                  { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={10} viewBoxSize={[100,100]}
            />
          </View>
          {/* <PieChart style={{marginLeft:-10,}}
            data={[
                { title: 'One', value: 4, color: '#FFD6AF' },
                { title: 'Two', value: 1, color: '#FFF9C3' },
            ]} lineWidth={35} viewBoxSize={[100,100]}
          />
          <PieChart style={{marginLeft:-10,}}
            data={[
                { title: 'One', value: 4, color: '#FFD6AF' },
                { title: 'Two', value: 1, color: '#FFF9C3' },
            ]} lineWidth={35} viewBoxSize={[100,100]}
          />
          <PieChart style={{marginLeft:-10,}}
            data={[
                { title: 'One', value: 4, color: '#FFD6AF' },
                { title: 'Two', value: 1, color: '#FFF9C3' },
            ]} lineWidth={35} viewBoxSize={[100,100]}
          />
          <PieChart style={{marginLeft:-10,}}
            data={[
                { title: 'One', value: 4, color: '#FFD6AF' },
                { title: 'Two', value: 1, color: '#FFF9C3' },
            ]} lineWidth={35} viewBoxSize={[100,100]}
          />
          <PieChart style={{marginLeft:-10,}}
            data={[
                { title: 'One', value: 4, color: '#FFD6AF' },
                { title: 'Two', value: 1, color: '#FFF9C3' },
            ]} lineWidth={35} viewBoxSize={[100,100]}
          />
          <PieChart style={{marginLeft:-10,}}
            data={[
                { title: 'One', value: 4, color: '#FFD6AF' },
                { title: 'Two', value: 1, color: '#FFF9C3' },
            ]} lineWidth={35} viewBoxSize={[100,100]}
          /> */}
          {/* </View> */}
          {/* <View>

          </View>
          <View>

          </View> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );}

}

const styles = StyleSheet.create({
  circleImage:{
    height: 500,
    width: 500,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 500,
    zIndex: 2,
  },
  valence:{
    zIndex: 4,
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
  spotifyButton:{
    backgroundColor: '#5BCC96',
    // justifyContent: 'center',
    paddingVertical: 10,
    // paddingHorizontal: '5%',
    borderRadius: 100,
    // marginTop: '10%',
    // alignSelf:'center',
    // alignContent: 'center',
    width: 150,
    alignSelf: 'flex-end',
    marginTop: '2%',
    marginRight: '2%'
  },
  buttonText:{
    color:'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Spartan',
    textAlign: 'center',
    // alignSelf: 'center'
  },
})

export default Song;