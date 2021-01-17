import React, {Component, useState} from 'react';
import {Button, Image, StyleSheet, Dimensions, TextInput, TouchableHighlight, Text, View, Alert, ScrollView, ImageBackground} from 'react-native';
import Modal from 'modal-react-native-web';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AxiosGetToken from '../Axios Functions/AxiosGetToken';
import {Picker} from '@react-native-community/picker';

//DP: 1HhAiDpmQdi5ryyFjzjlyD, JK(Test): 4y7pEAyFZCDl2fW8SHrEKJ  7am: 0fCpH2h614ebCnRW4Wmy9L
const playlistUriCode = '0fCpH2h614ebCnRW4Wmy9L';  
// const AuthToken = 
// 'BQBQ9g_nIuPFlZGDYKc1MH05xg8o51W0SLxdibSDgXxCMhfvbIGX9zNNnyBGtHBojgr-7tVJtnGPUyp8R0w3sTVQ-XyaeJJM1WRxrb3_wC3XHIfBl12Es2pyq9v8elYEyNDgrUibMcFQ2X4'
// ;
const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height;
const imageWidth = dimensions.width;

function determineKey(key){
  if(key == 0)      {return 'C'}
  else if(key == 1) {return 'C♯ / D♭'}
  else if(key == 2) {return 'D'}
  else if(key == 3) {return 'D♯ / E♭'}
  else if(key == 4) {return 'E'}
  else if(key == 5) {return 'F'}
  else if(key == 6) {return 'F♯ / G♭'}
  else if(key == 7) {return 'G'}
  else if(key == 8) {return 'G♯ / A♭'}
  else if(key == 9) {return 'A'}
  else if(key == 10){return 'A♯ / B♭'}
  else if(key == 11){return 'B'}
}

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
      TrackDetails: [],
      AuthToken: '',
      selectedValue:'date added',
    };
  }

  componentDidMount() {
    this.renderValues();
  }

  // getToken = async() =>{
  //   try{
  //     const token = await AxiosGetToken.GetToken();
  //     this.setState({
  //       AuthToken: token.access_token
  //     })
  //   }catch (err) {
  //     console.log(err);
  //   }
  // }

  renderValues = async() =>{
    try{
      let token = await AxiosGetToken.GetToken();
      this.setState({
        AuthToken: token.access_token
      })
      let playlist = await axios({
      method: 'get',
      url:`https://api.spotify.com/v1/playlists/${playlistUriCode}`,
      headers: {
        Authorization: `Bearer ${this.state.AuthToken}`
      },
      })
      .then(response=>{
          console.log(response.data);
          
          return response.data;
      })
      .catch(err =>{
          console.log(err, err.response);
          return err.response;
      });
      this.setState({
        TrackAmount: playlist.tracks.total,
        TrackDetails: await Promise.all(playlist.tracks.items.map(async(track) =>{
          let songFeatures = await axios({
            method: 'get',
            url:`https://api.spotify.com/v1/audio-features/${track.track.id}`,  //DP: 1HhAiDpmQdi5ryyFjzjlyD, JK(Test): 4y7pEAyFZCDl2fW8SHrEKJ
            headers: {
              Authorization: `Bearer ${this.state.AuthToken}`
            },
            })
            .then(response=>{
                console.log(response.data);
                
                return response.data;
            })
            .catch(err =>{
                console.log(err, err.response);
                return err.response;
            });
          // let roundedBpm = songFeatures.tempo.round();
          let keyString = determineKey(songFeatures.key);
          let minutes = Math.floor(track.track.duration_ms/60000);
          let seconds = Math.round((track.track.duration_ms - (60000*minutes))/1000);
          let dur = `${minutes}:${seconds}`;
          if(seconds<10){dur = `${minutes}:0${seconds}`;}
          let modality = 'Major';
          if(songFeatures.mode == 0){modality = 'Minor';}
          return({
            artwork: track.track.album.images[1].url,
            name: track.track.name,
            artists: track.track.artists[0].name,
            album: track.track.album.name,
            bpm: Math.round(songFeatures.tempo),
            keyNum: songFeatures.key,
            key: keyString,
            energy: songFeatures.energy,
            timeSig: songFeatures.time_signature,
            duration: dur,
            id: track.track.id,
            popularity: track.track.popularity,
            mode: modality,
            // even more features
            valence: songFeatures.valence,
            liveliness: songFeatures.liveliness,
            speechiness: songFeatures.speechiness,
            instrumentalness: songFeatures.instrumentalness,
            danceability: songFeatures.danceability,
            acousticness: songFeatures.acousticness,
        });
      })),
      })
      // let iterations = Math.floor(this.state.TrackAmount/100);
      // console.log(this.state.TrackAmount);
      // let offs = 0;
      // for(var i = 0; i < iterations; i++){
      //   offs += 100;
      //   let playlist = await axios({
      //   method: 'get',
      //   url:`https://api.spotify.com/v1/playlists/${playlistUriCode}/tracks`,
      //   headers: {
      //     Authorization: `Bearer ${this.state.AuthToken}`,
      //   },
      //   params:{
      //     offset:100,
      //   }
      //   })
      //   .then(response=>{
      //       console.log(response.data);
            
      //       return response.data;
      //   })
      //   .catch(err =>{
      //       console.log(err, err.response);
      //       return err.response;
      //   });
      //     await Promise.all(playlist.items.map(async(track) =>{ // Problems with this definition
      //       let songFeatures = await axios({
      //         method: 'get',
      //         url:`https://api.spotify.com/v1/audio-features/${track.track.id}`,  //DP: 1HhAiDpmQdi5ryyFjzjlyD, JK(Test): 4y7pEAyFZCDl2fW8SHrEKJ
      //         headers: {
      //           Authorization: `Bearer ${this.state.AuthToken}`
      //         },
      //         })
      //         .then(response=>{
      //             console.log(response.data);
                  
      //             return response.data;
      //         })
      //         .catch(err =>{
      //             console.log(err, err.response);
      //             return err.response;
      //         });
      //       // let roundedBpm = songFeatures.tempo.round();
      //       let keyString = determineKey(songFeatures.key);
      //       let minutes = Math.floor(track.track.duration_ms/60000);
      //       let seconds = Math.round((track.track.duration_ms - (60000*minutes))/1000);
      //       let dur = `${minutes}:${seconds}`;
      //       if(seconds<10){dur = `${minutes}:0${seconds}`;}
      //       let modality = 'Major';
      //       if(songFeatures.mode == 0){modality = 'Minor';}
      //       this.setState(state=>{
      //       const TrackDetails = state.TrackDetails.concat({
      //         artwork: track.track.album.images[1].url,
      //         name: track.track.name,
      //         artists: track.track.artists[0].name,
      //         album: track.track.album.name,
      //         bpm: Math.round(songFeatures.tempo),
      //         keyNum: songFeatures.key,
      //         key: keyString,
      //         energy: songFeatures.energy,
      //         timeSig: songFeatures.time_signature,
      //         duration: dur,
      //         id: track.track.id,
      //         popularity: track.track.popularity,
      //         mode: modality,
      //         // even more features
      //         valence: songFeatures.valence,
      //         liveliness: songFeatures.liveliness,
      //         speechiness: songFeatures.speechiness,
      //         instrumentalness: songFeatures.instrumentalness,
      //         danceability: songFeatures.danceability,
      //         acousticness: songFeatures.acousticness,
      //       });
      //       return{TrackDetails};
      //     })
      //     }))
      // }

      this.setState({
        Name: playlist.name,
        ImageUrl: playlist.images[0].url,
        Owner: playlist.owner.display_name,
        Descrip: playlist.description,
        TrackAmount: playlist.tracks.total,

        BasicInfo: this.state.TrackDetails.map((song, i) => {
          return(
          <TouchableOpacity style={styles.songList} onPress={()=>{
              this.props.navigation.navigate('Song', {
                token: this.state.AuthToken,
                songID:song.id,
                artwork: song.artwork,
                name: song.name,
                artists: song.artists,
                album: song.album,
                duration: song.duration,
                key: song.key,
                timeSig: song.timeSig,
                bpm: song.bpm,
                popularity: song.popularity,
                mode: song.mode,
                // in depth audio features
                valence: song.valence,
                liveliness: song.liveliness,
                speechiness: song.speechiness,
                instrumentalness: song.instrumentalness,
                energy: song.energy,
                danceability: song.danceability,
                acousticness: song.acousticness,
              })
            }} key={i}>
            <View style={styles.songLeft}>
            <Image source={{uri: song.artwork}} style={styles.albumArtwork}/>
              <Text style={styles.songTextTrack}>{song.name}</Text>
            </View>
            <View style={styles.songMiddle}>
              <Text style={styles.songTextArtist}>{song.artists}</Text>
              <Text style={styles.songTextAlbum}>{song.album}</Text>
            </View>
            <View style={styles.songRight}>
              {/* <View style={styles.rightLeft}> */}
                <Text style={styles.songText}>{song.duration}</Text>
                <Text style={styles.songText}>{song.key}</Text>
                <Text style={styles.songText}>{Math.round(song.energy * 10)}</Text>
              {/* </View> */}
              {/* <View style={styles.rightRight}> */}
                <Text style={styles.songText}>{song.bpm}</Text>
                <Text style={styles.songText}>{song.timeSig}</Text>
              {/* </View> */}
            </View>
          </TouchableOpacity>
        )})

      });
    }catch (err) {
      console.log(err);
    }
  }

  sortPlaylist = sortMethod => {
    if(sortMethod == 'bpm'){
    this.setState({
      TrackDetails: this.state.TrackDetails.sort((a,b) => (a.bpm > b.bpm) ? 1 : -1)
    })}
    else if(sortMethod == 'key'){
    this.setState({
      TrackDetails: this.state.TrackDetails.sort((a,b) => (a.keyNum > b.keyNum) ? 1 : -1)
    })}
    else if(sortMethod == 'energy'){
    this.setState({
      TrackDetails: this.state.TrackDetails.sort((a,b) => (a.energy > b.energy) ? 1 : -1)
    })}
    else if(sortMethod == 'name'){
    this.setState({
      TrackDetails: this.state.TrackDetails.sort((a,b) => (a.name > b.name) ? 1 : -1)
    })}
    else if(sortMethod == 'artists'){
    this.setState({
      TrackDetails: this.state.TrackDetails.sort((a,b) => (a.artists > b.artists) ? 1 : -1)
    })}
    this.setState({
      BasicInfo: this.state.TrackDetails.map((song,i) => {
        return(
        <TouchableOpacity style={styles.songList} onPress={()=>{
            this.props.navigation.navigate('Song', {
              token: this.state.AuthToken,
              songID:song.id,
              artwork: song.artwork,
              name: song.name,
              artists: song.artists,
              album: song.album,
              duration: song.duration,
              key: song.key,
              timeSig: song.timeSig,
              bpm: song.bpm,
              popularity: song.popularity,
              mode: song.mode,
              // in depth audio features
              valence: song.valence,
              liveliness: song.liveliness,
              speechiness: song.speechiness,
              instrumentalness: song.instrumentalness,
              energy: song.energy,
              danceability: song.danceability,
              acousticness: song.acousticness,
            })
          }} key={i}>
          <View style={styles.songLeft}>
          <Image source={{uri: song.artwork}} style={styles.albumArtwork}/>
            <Text style={styles.songTextTrack}>{song.name}</Text>
          </View>
          <View style={styles.songMiddle}>
            <Text style={styles.songTextArtist}>{song.artists}</Text>
            <Text style={styles.songTextAlbum}>{song.album}</Text>
          </View>
          <View style={styles.songRight}>
            {/* <View style={styles.rightLeft}> */}
              <Text style={styles.songText}>{song.duration}</Text>
              <Text style={styles.songText}>{song.key}</Text>
              <Text style={styles.songText}>{Math.round(song.energy * 10)}</Text>
            {/* </View> */}
            {/* <View style={styles.rightRight}> */}
              <Text style={styles.songText}>{song.bpm}</Text>
              <Text style={styles.songText}>{song.timeSig}</Text>
            {/* </View> */}
          </View>
        </TouchableOpacity>
      )})
    })
  }

  filterPlaylist = (filterMethod, params) => {
    if(filterMethod == 'key'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.key==params))
    })}
    else if(filterMethod == 'energy'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.energy > params.minEnergy && track.energy < params.maxEnergy))
    })}
    else if(filterMethod == 'time sig.'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.timeSig==params))
    })}
    else if(filterMethod == 'bpm'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.bpm > params.minBpm && track.bpm < params.maxBpm))
    })}
    else if(filterMethod == 'artists'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.artists==params.artists))
    })}
    this.setState({
      BasicInfo: this.state.TrackDetails.map((song,i) => {
        return(
        <TouchableOpacity style={styles.songList} onPress={()=>{
            this.props.navigation.navigate('Song', {
              token: this.state.AuthToken,
              songID:song.id,
              artwork: song.artwork,
              name: song.name,
              artists: song.artists,
              album: song.album,
              duration: song.duration,
              key: song.key,
              timeSig: song.timeSig,
              bpm: song.bpm,
              popularity: song.popularity,
              mode: song.mode,
              // in depth audio features
              valence: song.valence,
              liveliness: song.liveliness,
              speechiness: song.speechiness,
              instrumentalness: song.instrumentalness,
              energy: song.energy,
              danceability: song.danceability,
              acousticness: song.acousticness,
            })
          }} key={i}>
          <View style={styles.songLeft}>
          <Image source={{uri: song.artwork}} style={styles.albumArtwork}/>
            <Text style={styles.songTextTrack}>{song.name}</Text>
          </View>
          <View style={styles.songMiddle}>
            <Text style={styles.songTextArtist}>{song.artists}</Text>
            <Text style={styles.songTextAlbum}>{song.album}</Text>
          </View>
          <View style={styles.songRight}>
            {/* <View style={styles.rightLeft}> */}
              <Text style={styles.songText}>{song.duration}</Text>
              <Text style={styles.songText}>{song.key}</Text>
              <Text style={styles.songText}>{Math.round(song.energy * 10)}</Text>
            {/* </View> */}
            {/* <View style={styles.rightRight}> */}
              <Text style={styles.songText}>{song.bpm}</Text>
              <Text style={styles.songText}>{song.timeSig}</Text>
            {/* </View> */}
          </View>
        </TouchableOpacity>
      )})
    })
  }

  render(){return (
    // <View style={{
    //   height: imageHeight-45,
    //   }}>
    <ImageBackground source = {{uri:this.state.ImageUrl}} style = {styles.backgroundimage} imageStyle={{resizeMode:'cover'}} blurRadius= {200}>
      <ScrollView style = {{paddingBottom:'3%'}}>
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
            {/* <TouchableOpacity style={styles.optionsNav} onPress={()=>(this.sortPlaylist('name'))}>
              <Text style={styles.navText}>date added</Text>
            </TouchableOpacity> */}
            <Picker style={styles.optionsNav} selectedValue={this.state.selectedValue} onValueChange={(itemValue,itemIndex) =>{
              this.setState({selectedValue:itemValue});
              this.sortPlaylist(itemValue);
              }}>
              <Picker.Item label = "bpm" value = "bpm"/>
              <Picker.Item label = "key" value = "key"/>
              <Picker.Item label = "energy" value = "energy"/>
              <Picker.Item label = "name" value = "name"/>
              <Picker.Item label = "artists" value = "artists"/>
            </Picker>
          </View>
          <View style={styles.rightOptions}>
            <Text style={styles.optionsText}>filter by:</Text>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>key</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>energy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={()=>{
              let params = {minBpm: 100, maxBpm: 140};
              this.filterPlaylist('bpm', params);
            }}>
              <Text style={styles.navText}>bpm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Text style={styles.navText}>time sig.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headBar}>
          <View style={styles.leftBar}>
            <Text style={styles.barText}>TRACK</Text>
          </View>
          <View style={styles.middleBar}>
            <Text style={styles.barTextArtist}>ARTIST</Text>
            <Text style={styles.barText}>ALBUM</Text>
          </View>
          <View style={styles.rightBar}>
            <Text style={styles.barText}>DUR.</Text>
            <Text style={styles.barText}>KEY</Text>
            <Text style={styles.barText}>ENERGY</Text>
            <Text style={styles.barText}>BPM</Text>
            <Text style={styles.barText}>TIME SIG.</Text>
          </View>
        </View>

        {this.state.BasicInfo}

      </ScrollView>
    </ImageBackground>
    // </View>
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
    width: '20%',
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
    // width:142,
    width:'26%',
    paddingLeft: '7%',
    // textAlign:'right',
    // marginLeft:10,
  },
  middleBar: {
    // width:260,
    width:'35%',
    flexDirection:'row',
    // justifyContent:'space-between',
    // marginLeft:-45, // Going to start making edits
  },
  rightBar: {
    // width:420,
    width:'36%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  barText: {
    color:'white',
    fontSize:18,
    fontWeight: '700',
    flex:1
  },
  barTextArtist: {
    color:'white',
    fontSize:18,
    fontWeight: '700',
    flex: 1,
    paddingRight: '2%'
  },
  songList: {
    width:'95%',
    // height:'100%',
    height: 110,
    padding:10,
    borderBottomWidth:1,
    color:'white',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'space-between'
  },
  songLeft: {
    // width:240,
    width: '26%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  songMiddle: {
    // width:400,
    width: '35%',
    flexDirection:'row',
    // justifyContent:'space-between',
    textAlign:'left',
    // marginLeft: '2%',
  },
  songRight: {
    // width:360,
    width: '36%',
    flexDirection:'row',
    textAlign:'left',
  },
  albumArtwork: {
    width:'25%',
    height:'100%',
    // paddingRight: '2%',
    // width:imageHeight/19,
    // height:imageWidth/19,
    // marginRight: '4%',
    // marginLeft: '-4%',
    resizeMode: 'contain',
  },
  songTextArtist: {
    color:'white',
    fontSize:16,
    fontFamily:'spartan',
    flex:1,
    // width: '100%',
    // paddingHorizontal: '2%',
    // paddingLeft: '2%',
    paddingRight: '2%',
  },
  songTextAlbum: {
    color:'white',
    fontSize:16,
    fontFamily:'spartan',
    flex:1,
    // width: '80%',
    // marginLeft: '9%',
  },
  songText: {
    color:'white',
    fontSize:16,
    fontFamily:'spartan',
    flex:1,
  },
  songTextTrack: {
    color:'white',
    fontSize:16,
    fontFamily:'spartan',
    flex:1,
    width: '80%',
    paddingHorizontal: '2%',
  },
  rightLeft: {  // dur, key, energy
    // width:160,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  rightRight: { // bpm, timeSig
    // width:250,
    marginLeft:35,
    flexDirection:'row',
    justifyContent:'space-between',
    // marginRight:10
  },
  backgroundimage: {
    flex: 1,
    resizeMode: 'contain',
    // minWidth: imageWidth,
    // // resizeMethod: 'resize',
    justifyContent: "center",
    // alignItems: 'center',
    // alignText: 'center',
    // alignContent: 'center',
    // height: '100%',
    // height: imageHeight-45,
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