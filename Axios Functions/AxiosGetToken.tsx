import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    GetToken: () =>
    axios({
    method: 'post',
    url:'https://accounts.spotify.com/api/token',
    auth:{
            username: 'e8cc181b4d894651a6e06bff78585bef',
            password: 'a9560ff7171f4af59d8cd49e9a279437',
        },
    headers:{
        'content-type':'application/x-www-form-urlencoded'
    },
    data:'grant_type=client_credentials'
    })
    .then(response=>{
        var xToken = new XAccessToken();
        XAccessToken.token = response.data.access_token;
        console.log(response.data);      
        return response.data;
    })
    .catch(err =>{
        console.log(err, err.response);
    })
}