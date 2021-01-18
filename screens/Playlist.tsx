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
      keyPickerVal:'',
      showFilterSpecs: 'initial',
      min:0,
      max:200,
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
      /* Getting the access token  */
      let token = await AxiosGetToken.GetToken();
      this.setState({
        AuthToken: token.access_token
      })
      /* Get all the tracks from the playlist */
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
      //     offset:offs,
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
      TrackDetails: this.state.TrackDetails.filter(track=> (track.keyNum==params))
    })}
    else if(filterMethod == 'energy'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> ((Math.round(track.energy * 10) >= params.minEnergy) && Math.round(track.energy * 10) <= params.maxEnergy))
    })}
    else if(filterMethod == 'time sig.'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.timeSig==params))
    })}
    else if(filterMethod == 'bpm'){
    this.setState({
      TrackDetails: this.state.TrackDetails.filter(track=> (track.bpm >= params.minBpm && track.bpm <= params.maxBpm))
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

  renderFilterSpecs=()=>{
    if(this.state.showFilterSpecs == 'initial'){
      return(
        <View></View>
      );}
    else if (this.state.showFilterSpecs == 'key'){
      return(
        <View style={styles.filterSpecContainer}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.setState({showFilterSpecs:'initial'})}}>
              <Text style={styles.filterSpecText}> X </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#8F8F8F', paddingVertical: '7%', paddingHorizontal:'20%', borderRadius: 50}} onPress={()=>{this.renderValues()}}>
              <Text style={styles.filterSpecText}>RESET</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: '5%'}}>
            <View style = {styles.threeKeyContainer}>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 0);}}>
                <Text style={styles.filterSpecText}>    C    </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 1);}}>
                <Text style={styles.filterSpecText}>C♯ / D♭</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 2);}}>
                <Text style={styles.filterSpecText}>    D    </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.threeKeyContainer}>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 3);}}>
                <Text style={styles.filterSpecText}>D♯ / E♭</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 4);}}>
                <Text style={styles.filterSpecText}>    E    </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 5);}}>
                <Text style={styles.filterSpecText}>    F    </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.threeKeyContainer}>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 6);}}>
                <Text style={styles.filterSpecText}>F♯ / G♭</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 7);}}>
                <Text style={styles.filterSpecText}>    G    </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 8);}}>
                <Text style={styles.filterSpecText}>G♯ / A♭</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.threeKeyContainer}>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 9);}}>
                <Text style={styles.filterSpecText}>    A    </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 10);}}>
                <Text style={styles.filterSpecText}>A♯ / B♭</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterSpecButton} onPress={()=>{this.filterPlaylist('key', 11);}}>
                <Text style={styles.filterSpecText}>    B    </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    else if (this.state.showFilterSpecs == 'energy'){
      return(
        <View style={styles.filterSpecInputContainer}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.setState({showFilterSpecs:'initial'})}}>
              <Text style={styles.filterSpecText}> X </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#8F8F8F', paddingVertical: '7%', paddingHorizontal:'20%', borderRadius: 50}} onPress={()=>{this.renderValues()}}>
              <Text style={styles.filterSpecText}>RESET</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:'10%'}}>
            <Text style={styles.filterSpecMinMaxText}>min  energy</Text>
            <TextInput
              style={styles.filterSpecInput}
              onChangeText = {minEnergy=>this.setState({min:parseInt(minEnergy)})}
              placeholder={'0'}
              allowFontScaling = {true}
              placeholderTextColor='#C4C4C4'
              />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', marginVertical: '10%'}}>
            <Text style={styles.filterSpecMinMaxText}>max energy</Text>
            <TextInput
              style={styles.filterSpecInput}
              onChangeText = {maxEnergy=>this.setState({max:parseInt(maxEnergy)})}
              placeholder={'10'}
              allowFontScaling = {true}
              placeholderTextColor='#C4C4C4'
              />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-evenly',marginBottom:'3%', marginTop: '1%',}}>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#5BCC96', paddingVertical: '5%', paddingHorizontal:'100%', borderRadius:50}} onPress={()=>{this.filterPlaylist('energy', {minEnergy:this.state.min, maxEnergy:this.state.max})}}>
              <Text style={{color:'white', alignSelf:'center'}}>FILTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else if (this.state.showFilterSpecs == 'bpm'){
      return(
        <View style={styles.filterSpecInputContainer}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.setState({showFilterSpecs:'initial'})}}>
              <Text style={styles.filterSpecText}> X </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#8F8F8F', paddingVertical: '7%', paddingHorizontal:'20%', borderRadius: 50}} onPress={()=>{this.renderValues()}}>
              <Text style={styles.filterSpecText}>RESET</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop:'10%'}}>
            <Text style={styles.filterSpecMinMaxText}>min  bpm</Text>
            <TextInput
              style={styles.filterSpecInput}
              onChangeText = {minBpm=>this.setState({min:parseInt(minBpm)})}
              // placeholder={'0'}
              allowFontScaling = {true}
              placeholderTextColor='#C4C4C4'
              />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', marginVertical: '10%'}}>
            <Text style={styles.filterSpecMinMaxText}>max bpm</Text>
            <TextInput
              style={styles.filterSpecInput}
              onChangeText = {maxBpm=>this.setState({max:parseInt(maxBpm)})}
              // placeholder={'10'}
              allowFontScaling = {true}
              placeholderTextColor='#C4C4C4'
              />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-evenly',marginBottom:'3%', marginTop: '1%',}}>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#5BCC96', paddingVertical: '5%', paddingHorizontal:'100%', borderRadius:50}} onPress={()=>{this.filterPlaylist('bpm', {minBpm:this.state.min, maxBpm:this.state.max})}}>
              <Text style={{color:'white', alignSelf:'center'}}>FILTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else if (this.state.showFilterSpecs == 'timeSig'){
      return(
        <View style={styles.filterSpecInputContainer}>
          <View style={{flexDirection: 'row', justifyContent:'space-between', width:'90%', alignSelf:'center'}}>
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{this.setState({showFilterSpecs:'initial'})}}>
              <Text style={styles.filterSpecText}> X </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#8F8F8F', paddingVertical: '7%', paddingHorizontal:'20%', borderRadius: 50}} onPress={()=>{this.renderValues()}}>
              <Text style={styles.filterSpecText}>RESET</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', marginVertical: '10%'}}>
            <Text style={styles.filterSpecMinMaxText}>time signature</Text>
            <TextInput
              style={styles.filterSpecInput}
              onChangeText = {timeSig=>this.setState({max:parseInt(timeSig)})}
              // placeholder={'10'}
              allowFontScaling = {true}
              placeholderTextColor='#C4C4C4'
              />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-evenly',marginBottom:'3%', marginTop: '1%',}}>
            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#5BCC96', paddingVertical: '5%', paddingHorizontal:'100%', borderRadius:50}} onPress={()=>{this.filterPlaylist('time sig.', this.state.max)}}>
              <Text style={{color:'white', alignSelf:'center'}}>FILTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
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
          {this.renderFilterSpecs()}
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
            <TouchableOpacity style={styles.optionsButton} onPress={()=>{this.setState({showFilterSpecs:'key'})}}>
              <Text style={styles.navText}>key</Text>
            </TouchableOpacity>
            {/* <Picker style={styles.optionsButton} selectedValue={this.state.keyPickerVal} onValueChange={(itemValue,itemIndex) =>{
              this.setState({keyPickerVal:itemValue});
              this.filterPlaylist('key',itemValue);
              }}>
              <Picker.Item label = "key" value = {-1}/>
              <Picker.Item label = "C" value = {0}/>
              <Picker.Item label = "C♯ / D♭" value = {1}/>
              <Picker.Item label = "D" value = {2}/>
              <Picker.Item label = "D♯ / E♭" value = {3}/>
              <Picker.Item label = "E" value = {4}/>
              <Picker.Item label = "F" value = {5}/>
              <Picker.Item label = "F♯ / G♭" value = {6}/>
              <Picker.Item label = "G" value = {7}/>
              <Picker.Item label = "G♯ / A♭" value = {8}/>
              <Picker.Item label = "A" value = {9}/>
              <Picker.Item label = "A♯ / B♭" value = {10}/>
              <Picker.Item label = "B" value = {11}/>
            </Picker> */}
            <TouchableOpacity style={styles.optionsButton} onPress={()=>{this.setState({showFilterSpecs:'energy'})}}>
              <Text style={styles.navText}>energy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={()=>{this.setState({showFilterSpecs:'bpm'})}}>
              <Text style={styles.navText}>bpm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton} onPress={()=>{this.setState({showFilterSpecs:'timeSig'})}}>
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


const styles = StyleSheet.create({
  pickerItemStyle:{
    fontFamily: 'Spartan',
    textAlign: 'center',
  },
  filterSpecContainer:{
    // height:100,
    zIndex:5,
    position:'absolute',
    alignSelf:'flex-end',
    marginRight:'5%',
    backgroundColor: '#353535',
    marginTop:'7%',
    width:'20%',
    padding:'1%',
  },
  filterSpecInputContainer:{
    // height:100,
    zIndex:5,
    position:'absolute',
    alignSelf:'flex-end',
    marginRight:'5%',
    backgroundColor: '#353535',
    marginTop:'7%',
    width:'12%',
    padding: '1%'
  },
  threeKeyContainer:{
    flexDirection:'column',
    marginHorizontal: '4%'
  },
  filterSpecButton:{
    marginVertical:'10%',
    paddingVertical:'2%',
    // paddingHorizontal:'1%',
    alignSelf: 'center',
    // backgroundColor:'#C4C4C4',
    width:'120%',
    textAlign: 'center',
    borderWidth:1,
    borderColor:'#E5E5E5'
    // width:60,
  },
  filterSpecText:{
    fontSize:12,
    fontFamily: 'Spartan',
    color:'white',
  },
  filterSpecMinMaxText:{
    fontSize:12,
    fontFamily: 'Spartan',
    color:'white',
    paddingRight:'20%'
  },
  filterSpecInput:{
    color:'white',
    borderColor:'#C4C4C4',
    borderWidth:1,
    width:'50%',
  },
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
    fontFamily: 'Spartan',
    textAlign: 'center',
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
    fontFamily: 'Spartan',
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
    marginTop: '20%',
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