import React, {Component, useState} from 'react';
import {Button, Image, StyleSheet, TextInput, TouchableHighlight, Text, View, Alert, ScrollView, ImageBackground} from 'react-native';
import Modal from 'modal-react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {PieChart} from 'react-minimal-pie-chart';

class Song extends Component {

  render() {return (
    <ImageBackground source = {{uri:require('../assets/images/in_your_head.jpeg')}} style = {styles.backgroundimage} blurRadius= {200}>
      {/* <ScrollView> */}
        <TouchableOpacity style={styles.spotifyButton}>
          <Text style={styles.buttonText}>PLAY ON SPOTIFY</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          {/* <View style={styles.circleImage}> */}
          <Image source={require('../assets/images/in_your_head.jpeg')} style={{ height: 500, width: 500, resizeMode: 'contain', alignSelf: 'center', borderRadius: 500, zIndex: 2,}} blurRadius={20}/>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 400, width: 400}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#D630FF' },
                  { title: 'Two', value: 75, color: '#EEAAFF' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={15} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 341, width: 341}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#3E3BD6' },
                  { title: 'Two', value: 75, color: '#8E8CD4' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={16} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 287, width: 287}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#7280FF' },
                  { title: 'Two', value: 75, color: '#A5AEFF' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={18} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 236, width: 236}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#5BCC96' },
                  { title: 'Two', value: 75, color: '#96EAC2' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={21} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 186, width: 186}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#FFE70F' },
                  { title: 'Two', value: 75, color: '#FFF7B1' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={27} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 137, width: 137}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#FF7A00' },
                  { title: 'Two', value: 75, color: '#FFC48D' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={34} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:4, opacity: .4,position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', height: 91, width: 91}}>
            <PieChart style={{alignSelf: 'center', justifySelf: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'center'}}
              data={[
                  { title: 'One', value: 25, color: '#FF0000' },
                  { title: 'Two', value: 75, color: '#FF9696' },
                  // { title: 'Two', value: 85, color: '#FFF9C3' },
              ]} lineWidth={41} viewBoxSize={[100,100]} totalValue={200} startAngle={90}
            />
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 400, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>valence</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 341, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>liveliness</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 287, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>speechiness</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 236, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>instrumentalness</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 186, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>energy</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 137, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>danceability</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:5,position: 'absolute', alignSelf: 'auto', height: 91, justifyContent: 'space-between', marginLeft: '51%'}}>
            <Text style={styles.graphValues}>acoustic</Text>
            <Text style={styles.graphValues}>0.734</Text>
          </View>
          <View style={{zIndex:0,position: 'absolute', alignSelf: 'center',  width: '100%'}}>
            <View style={styles.line}>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextLeft}>2:58</Text>
                <Text style={styles.statDescText}>DURATION</Text>
              </View>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextRight}>50%</Text>
                <Text style={styles.statDescText}>POPULARITY</Text>
              </View>
            </View>
            <View style={styles.line}>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextLeft}>B</Text>
                <Text style={styles.statDescText}>KEY</Text>
              </View>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextRight}>111</Text>
                <Text style={styles.statDescText}>BARS</Text>
              </View>
            </View>
            <View style={styles.line}>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextLeft}>Major</Text>
                <Text style={styles.statDescText}>MODALITY</Text>
              </View>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextRight}>443</Text>
                <Text style={styles.statDescText}>BEATS</Text>
              </View>
            </View>
            <View style={styles.line}>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextLeft}>4</Text>
                <Text style={styles.statDescText}>TIME SIGNATURE</Text>
              </View>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextRight}>10</Text>
                <Text style={styles.statDescText}>SECTIONS</Text>
              </View>
            </View>
            <View style={styles.line}>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextLeft}>150</Text>
                <Text style={styles.statDescText}>TEMPO (BPM)</Text>
              </View>
              <View style={styles.featureContainer}>
                <Text style={styles.statTextRight}>669</Text>
                <Text style={styles.statDescText}>SEGMENTS</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.songInfoContainer}>
          <Text style={styles.songTitle}>In Your Head - RL Grime Edit</Text>
          <Text style={styles.songArtist}>G Jones, RL Grime</Text>
          <Text style={styles.songTypeYear}>Single 2019</Text>
        </View>
      {/* </ScrollView> */}
    </ImageBackground>
  );}

}

const styles = StyleSheet.create({
  songTitle:{
    color: 'white',
    fontFamily:'Spartan',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'left',
    marginVertical: '2%',
  },
  songArtist:{
    color: 'white',
    fontFamily:'Spartan',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    marginVertical: '2%',
  },
  songTypeYear:{
    color: 'white',
    fontFamily:'Spartan',
    fontSize: 15,
    textAlign: 'left',
    marginVertical: '2%',
  },
  songInfoContainer:{
    // width: '60%',
    alignSelf: 'center',
    marginVertical: '2%',
  },
  statTextLeft:{
    color: 'white',
    fontFamily:'Spartan',
    fontSize: 20,
    fontWeight: '700',
  },
  statTextRight:{
    color: 'white',
    fontFamily:'Spartan',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right',
  },
  statDescText:{
    color: 'white',
    fontFamily: 'Spartan',
    fontSize: 15,
  },
  graphValues:{
    color: 'white',
    fontFamily: 'Spartan',
    fontSize: 12,
    textAlign: 'left'
  },
  line:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 10,
    marginHorizontal: '2%',
  },
  featureContainer:{

  },
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