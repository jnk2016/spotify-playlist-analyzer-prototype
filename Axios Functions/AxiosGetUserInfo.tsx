import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    userInfo: () =>
    axios({
    method: 'get',
    url:'http://127.0.0.1:5000/user',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    })
    .then(response=>{
        console.log(response.data.user);
        return response.data.user;
    })
    .catch(err =>{
        console.log(err, err.response);
        return err.response;
    })
}