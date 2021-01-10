import axios from 'axios';
import XAccessToken from './StaticToken';

export default{ 
    statement: () =>
    axios({
    method: 'get',
    url:'http://127.0.0.1:5000/latestStatement',
    headers:{
            'x-access-token': XAccessToken.getToken()
    },
    })
    .then(response=>{
        console.log(response.data.statement);
        return response.data.statement;
    })
    .catch(err =>{
        console.log(err, err.response);
        return false;
    })
}