import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    vehicle: () =>
    axios({
    method: 'get',
    url:'http://127.0.0.1:5000/vehicle',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    })
    .then(response=>{
        console.log(response.data.vehicles[0]);
        return response.data.vehicles[0];
    })
    .catch(err =>{
        console.log(err, err.response);
        return err.response;
    })
}