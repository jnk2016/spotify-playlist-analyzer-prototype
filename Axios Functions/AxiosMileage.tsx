import axios from 'axios';
import XAccessToken from '../Axios Functions/StaticToken';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default{ 
    mileage: () =>
    axios({
    method: 'get',
    url:'http://127.0.0.1:5000/mileage',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    })
    .then(response=>{
        console.log(response.data);
        return response.data;
    })
    .catch(err =>{
        console.log(err, err.response);
        return err.response;
    })
}