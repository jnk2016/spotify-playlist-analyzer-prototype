import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    GetTrackAnalysis: (id, token) =>
    axios({
    method: 'get',
    url:`https://api.spotify.com/v1/audio-analysis/${id}`,
    headers:{
        'Authorization':`Bearer ${token}`
    },
    })
    .then(response=>{
        console.log(response.data);
        return response.data;
    })
    .catch(err =>{
        console.log(err, err.response);
        console.log(token);
    })
}