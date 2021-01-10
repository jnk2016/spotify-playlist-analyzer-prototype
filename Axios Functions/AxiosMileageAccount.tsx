import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    CurrentOdometer: () =>
    axios({
    method: 'get',
    url:'http://127.0.0.1:5000/current-odometer',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    })
    .then(response=>{
        console.log(response.data.data);
        return response.data.data;
    })
    .catch(err =>{
        console.log(err, err.response);
        return err.response.data;
    })
}