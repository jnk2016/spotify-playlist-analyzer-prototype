import React, {Component, useState} from 'react';
import {Button, Image, StyleSheet, TextInput, TouchableHighlight, Text, View, Alert, ScrollView, ImageBackground} from 'react-native';
import Modal from 'modal-react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

class PlaylistItems extends React.Component<{}, any>{
  constructor(props) {
    super(props)
    this.state = {
      BasicInfo: [],
      Name: '',
      ImageUrl: '',
      Owner: '',
      Descrip: '',
      TrackAmount: '',
    };
  }

  componentDidMount() {
    this.renderValues();
  }
  renderValues= async() =>{
    try{
      let playlist = await axios({
      method: 'get',
      url:'https://api.spotify.com/v1/playlists/4y7pEAyFZCDl2fW8SHrEKJ',  //DP: 1HhAiDpmQdi5ryyFjzjlyD, JK(Test): 4y7pEAyFZCDl2fW8SHrEKJ
      headers: {
        Authorization: 'Bearer BQCNxJOPPILhOVjCzT8kiD4LBeVRahvy_Mtkm4XSZXSR3DtCi6zCPYdK5REU7m--EbevMtO_Z-9ojKfAY4T-6NTzQKjAE-omYuz1VHkVoXG5DmFGD8D1-q19fNSm-qPP8h6xD93l1AKhLoc'
      },
      })
      .then(response=>{
          console.log(response.data);
          // console.log(response.data.statements);
          // console.log(response.data.statements[1]);
          
          return response.data;
          // return response.data;
      })
      .catch(err =>{
          console.log(err, err.response);
          return err.response;
      });
      
      this.setState({
        Name: playlist.name,
        ImageUrl: playlist.images[0].url,
        Owner: playlist.owner.display_name,
        Descrip: playlist.description,
        TrackAmount: playlist.tracks.total,

        BasicInfo: playlist.tracks.items.map((song, i) => (
          <TouchableOpacity style={styles.songList} onPress={()=>{this.props.navigation.navigate('Song')}}>
            <View style={styles.songLeft}>
            <Image source={{uri: song.track.album.images[1].url}} style={styles.albumArtwork}/>
              <Text style={styles.songText}>{song.track.name}</Text>
            </View>
            <View style={styles.songMiddle}>
              <Text style={styles.songText}>{song.track.artists[0].name}</Text>
              <Text style={styles.songText}>{song.track.album.name}</Text>
            </View>
            <View style={styles.songRight}>
              <View style={styles.rightLeft}>
                <Text style={styles.songText}>B Major</Text>
                <Text style={styles.songText}>10</Text>
              </View>
              <View style={styles.rightRight}>
                <Text style={styles.songText}>1B</Text>
                <Text style={styles.songText}>150</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      });
    }catch (err) {
      console.log(err);
    }
  }
  render(){return (
    <ImageBackground source = {{uri:this.state.ImageUrl}} style = {styles.backgroundimage} blurRadius= {200}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.playlistContainer}>
            <View style={styles.playArtContainer}>
              <Image source={{uri: this.state.ImageUrl}} style={styles.playlistArtwork}/>
            </View>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName}>{this.state.Name}</Text>
              <Text style={styles.playlistUser}>by {this.state.Owner}</Text>
              <Text style={styles.playlistDesc}>{this.state.Descrip}</Text>
              <Text style={styles.trackAmount}>{this.state.TrackAmount} Tracks</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.spotifyButton}>
            <Text style={styles.buttonText}>PLAY ON SPOTIFY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.leftOptions}>
            <Text style={styles.optionsText}>sort by:</Text>
            <TouchableOpacity style={styles.optionsNav}>
              <Text style={styles.navText}>date added</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightOptions}>
            <Text style={styles.optionsText}>filter by:</Text>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>key</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>energy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>camelot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>bpm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headBar}>
          <View style={styles.leftBar}>
            <Text style={styles.barText}>TRACK</Text>
          </View>
          <View style={styles.middleBar}>
            <Text style={styles.barText}>ARTIST</Text>
            <Text style={styles.barText}>ALBUM</Text>
          </View>
          <View style={styles.rightBar}>
            <Text style={styles.barText}>KEY</Text>
            <Text style={styles.barText}>ENERGY</Text>
            <Text style={styles.barText}>CAMELOT</Text>
            <Text style={styles.barText}>BPM</Text>
          </View>
        </View>

        {this.state.BasicInfo}

      </ScrollView>
    </ImageBackground>
  );
  }
}

// class Playlist extends Component {

//   render() {
    

// }

const styles = StyleSheet.create({
  optionsContainer:{
    flexDirection: 'row',
    width:'95%',
    paddingVertical: 5,
    justifyContent:'space-between',
    alignSelf:'center'
  },
  leftOptions: {
    display:'flex',
    flexDirection:'row',
    width:'50%',
    height:'100%',
  },
  optionsText: {
    color:'white',
    fontFamily:'spartan',
    fontSize:14,
    paddingRight: '1%'
  },
  optionsNav: {
    width: '180%',
    height:'auto',
    padding:5,
    backgroundColor:'#e5e5e5',
    borderRadius:20,
  },
  navText: {
    color:'black',
    fontSize:14,
    textAlign:'center',
    fontFamily: 'Spartan'
  },
  rightOptions: {
    width:'30%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignContent:'flex-end',
  },
  optionsButton: {
    padding:5,
    backgroundColor:'#e5e5e5',
    width:90,
    borderRadius:20,
  },
  headBar: {
    borderWidth:1,
    borderColor:'white',
    width:'95%',
    height:'auto',
    padding:10,
    flexDirection:'row',
    alignSelf:'center',
    // marginTop:10,
    justifyContent:'space-between',
    // marginRight: 10
  },
  leftBar: {
    width:140,
    textAlign:'right',
    marginLeft:10,
  },
  middleBar: {
    width:260,
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:-45,
  },
  rightBar: {
    width:360,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  barText: {
    color:'white',
    fontSize:18,
  },
  songList: {
    width:'95%',
    height:'auto',
    padding:10,
    borderBottomWidth:1,
    color:'white',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'space-between'
  },
  songLeft: {
    width:240,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  songMiddle: {
    width:400,
    flexDirection:'row',
    justifyContent:'space-between',
    textAlign:'left',
  },
  songRight: {
    width:360,
    flexDirection:'row',
    textAlign:'left',
  },
  albumArtwork: {
    width:100,
    height:100,
    marginRight: '4%',
    marginLeft: '-4%'
  },
  songText: {
    color:'white',
    fontSize:16,
    fontFamily:'spartan',
    flex:1,
  },
  rightLeft: {
    width:160,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  rightRight: {
    width:250,
    marginLeft:35,
    flexDirection:'row',
    justifyContent:'space-between',
    // marginRight:10
  },
  backgroundimage: {
    // flex: 1,
    resizeMode: 'cover',
    // justifyContent: "center",
    // alignItems: 'center',
    // alignText: 'center',
    // alignContent: 'center',
    height: '100%',
  },
  headerContainer:{
    flexDirection: 'row',
    width: '95%',
    // alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: '1%'
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
  playArtContainer:{
    width:200,
    height:200,
    // paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playlistArtwork:{
    width: '100%',
    height: '100%', 
    // padding: '100%',
    resizeMode: 'contain',
    // marginLeft: '4%',
    // resizeMethod:'auto'
  },
  playlistInfo:{
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    // paddingVertical: '10%',
    marginLeft: 10,
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

export default PlaylistItems;